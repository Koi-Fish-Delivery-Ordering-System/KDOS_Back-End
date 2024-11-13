import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Not, Repository } from "typeorm"
import { DriverMySqlEntity, OrderMySqlEntity, RouteMySqlEntity } from "@database"
import { FindManyUserOrderInput, FindOneUserOrderInput } from "./order.input"
import { OrderStatus, RouteStatus, StopType, TransportType } from "@common"
import { provinces } from "src/common/utils/base.utils"

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(DriverMySqlEntity)
        private readonly driverMySqlRepository : Repository<DriverMySqlEntity>,
        @InjectRepository(OrderMySqlEntity)
        private readonly orderMySqlRepository: Repository<OrderMySqlEntity>,
        @InjectRepository(RouteMySqlEntity)
        private readonly routeMySqlRepository: Repository<RouteMySqlEntity>,
    ) { }

    async findManyUserOrder (input : FindManyUserOrderInput) : Promise<Array<OrderMySqlEntity>> {
        const { accountId } = input
        
        const results = await this.orderMySqlRepository.find({
            where:{
                accountId
            },
            relations:{
                account: true,
                orderedFish: {
                    qualifications: true
                },
                transportService: true
            },
            order:{
                createdAt: "DESC"
            }
        })

        return results
    }
    
    async findOneUserOrder (input : FindOneUserOrderInput) : Promise<OrderMySqlEntity> {
        const { accountId, data } = input
        const { params} = data
        const { orderId } = params

        const result = await this.orderMySqlRepository.findOne({
            where:{
                orderId,
                accountId
            }
        })

        return result
    }

    async findManyProcessingOrder(): Promise<Array<OrderMySqlEntity>> {
        let results = await this.orderMySqlRepository.find({
            where: {
                orderStatus: OrderStatus.Processing,
                transportService: {
                    type: TransportType.Road,
                },
            },
            relations: {
                transportService: true,
                routeStops: true,
                orderedFish: {
                    qualifications: true,
                },
                account: true,
                selectedAdditionalService: {
                    additionalService: true
                }
            }
        })
    
        const flightOrders = await this.orderMySqlRepository.find({
            where: {
                orderStatus: In([OrderStatus.Processing, OrderStatus.Delivering]),
                transportService: {
                    type: TransportType.Air,
                },
            },
            relations: {
                transportService: true,
                routeStops: true,
                orderedFish: {
                    qualifications: true
                },
                account: true,
                selectedAdditionalService: {
                    additionalService: true
                }
            }
        })
    
        const filteredFlightOrders = flightOrders.filter(order => {
            const { fromAddress, toAddress, fromProvince, toProvince, routeStops, orderStatus } = order
    
            const hasFirstHalfStops = routeStops.some(
                stop => stop.stopType === StopType.PickUp && stop.address === fromAddress
            ) && routeStops.some(
                stop => stop.stopType === StopType.Delivery && stop.address === `${provinces.find(p => p.province === fromProvince)?.airport} Airport`
            )

            const hasSecondHalfStops = routeStops.some(
                stop => stop.stopType === StopType.PickUp && stop.address === `${provinces.find(p => p.province === toProvince)?.airport} Airport`
            ) && routeStops.some(
                stop => stop.stopType === StopType.Delivery && stop.address === toAddress
            )

            const hasCompletedFirstDelivery = routeStops.some(
                stop => stop.stopType === StopType.Delivery 
                && stop.address === `${provinces.find(p => p.province === fromProvince)?.airport} Airport`
                && stop.status === RouteStatus.Completed
            )

            order.hasCompletedFirstDelivery = hasCompletedFirstDelivery

            return orderStatus === OrderStatus.Processing || (orderStatus === OrderStatus.Delivering && hasFirstHalfStops && !hasSecondHalfStops)
        })
    
        results = [...results, ...filteredFlightOrders]

        return results
    }
    
    async findAllOrder () : Promise<Array<OrderMySqlEntity>> {
        const results = await this.orderMySqlRepository.find({
            where:{
                orderStatus: Not(OrderStatus.UnCompleted)
            },
            relations:{
                account: {
                    transactions: true
                },
                orderedFish: {
                    qualifications: true
                },
                transportService: true,
                transactions: true,
            },
            order:{
                createdAt: "DESC"
            }
        })

        return results
    }
}