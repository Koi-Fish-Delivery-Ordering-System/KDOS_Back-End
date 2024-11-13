import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { AdditionalServiceMySqlEntity, DriverMySqlEntity, RouteMySqlEntity, TransportServiceMySqlEntity } from "@database"
import { Repository } from "typeorm"
import { FindManyAssignedRouteInput, FindManyCompletedRouteInput, FindManySuitableAdditionalServiceInput, FindManySuitableTransportServiceInput, FindOneDeliveringRouteInput } from "./transport.input"
import { checkFlightRoute } from "src/common/utils/base.utils"
import { RouteStatus, TransportType } from "@common"
import { VnpayService } from "@global"


@Injectable()
export class TransportService {
    constructor(
        @InjectRepository(TransportServiceMySqlEntity)
        private readonly transportMySqlRepository: Repository<TransportServiceMySqlEntity>,
        @InjectRepository(AdditionalServiceMySqlEntity)
        private readonly additionalServiceMySqlRepository: Repository<AdditionalServiceMySqlEntity>,
        @InjectRepository(RouteMySqlEntity)
        private readonly routeMySqlRepository: Repository<RouteMySqlEntity>,
        @InjectRepository(DriverMySqlEntity)
        private readonly driverMySqlRepository: Repository<DriverMySqlEntity>,
        private readonly vnpayService : VnpayService
    ) { }

    async findManySuitableTransportService(input: FindManySuitableTransportServiceInput): Promise<Array<TransportServiceMySqlEntity>> {
        const { data } = input
        const { fromProvince, toProvince } = data

        let results = await this.transportMySqlRepository.find({
            where: {
                isActive: true,
            }
        })

        if (!checkFlightRoute(fromProvince, toProvince)) {
            results = results.filter(service => service.type !== TransportType.Air)
        }

        console.log(
            this.vnpayService.createPaymentUrl("2asdasdasd3321", 341232))

        return results
    }

    async findAllTransportService(): Promise<Array<TransportServiceMySqlEntity>> {
        return await this.transportMySqlRepository.find()
    }

    async findAllAdditionalService(): Promise<Array<AdditionalServiceMySqlEntity>> {
        return await this.additionalServiceMySqlRepository.find()
    }

    async findManySuitableAdditionalService(input: FindManySuitableAdditionalServiceInput): Promise<Array<AdditionalServiceMySqlEntity>> {
        const { data } = input
        const { transportType } = data

        const results = await this.additionalServiceMySqlRepository.find({
            where: [
                {
                    forTransportType: transportType,
                    isActive: true
                },
                {
                    forTransportType: null,
                    isActive: true
                }
            ]
        })

        return results
    }

    async findManyAssignedRoute(input: FindManyAssignedRouteInput): Promise<Array<RouteMySqlEntity>> {
        const { accountId } = input

        const results = await this.routeMySqlRepository.find({
            where: {
                driverId: accountId,
                status: RouteStatus.Pending
            },
            relations: {
                driver: true,
                routeStops: {
                    order: {
                        orderedFish: true
                    }
                },
            },
            order: {
                createdAt: "DESC"
            }
        })

        return results
    }

    async findManyAvailableDriver(): Promise<Array<DriverMySqlEntity>> {
        const results = await this.driverMySqlRepository.find({
            relations: {
                account: true,
            }
        })

        return results
    }

    async findManyRoutes(): Promise<Array<RouteMySqlEntity>> {
        const results = await this.routeMySqlRepository.find({
            relations: {
                driver: {
                    account: true,
                },
                routeStops: {
                    order: {
                        transportService: true,
                        account: true
                    },
                },
            },
            order: {
                updatedAt: "DESC"
            }
        })

        results.forEach(route => {
            const uniqueOrderIds = new Set(route.routeStops.map(stop => stop.order.orderId))
            route.numberOfOrders = uniqueOrderIds.size
        })

        return results
    }

    async findOneDeliveringRoute(input: FindOneDeliveringRouteInput): Promise<RouteMySqlEntity> {
        const { accountId } = input

        const result = await this.routeMySqlRepository.findOne({
            where: {
                driverId: accountId,
                status: RouteStatus.Delivering
            },
            relations: {
                driver: {
                    account: true
                },
                routeStops: {
                    order: {
                        transportService: true,
                        orderedFish: true,
                        account: true
                    }
                }
            }
        })

        const uniqueOrderIds = new Set(result.routeStops.map(stop => stop.order.orderId))
        result.numberOfOrders = uniqueOrderIds.size

        return result
    }

    async findManyCompletedRoute(input: FindManyCompletedRouteInput): Promise<Array<RouteMySqlEntity>> {
        const { accountId } = input

        const results = await this.routeMySqlRepository.find({
            where: {
                status: RouteStatus.Completed,
                driverId: accountId,
            },
            relations: {
                routeStops: {
                    order: {
                        orderedFish: true,
                    }
                }
            }
        })

        return results
    }
}