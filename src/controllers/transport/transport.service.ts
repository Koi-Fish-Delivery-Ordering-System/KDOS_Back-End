import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { CreateAdditionalServiceInput, CreateRouteInput, CreateTransportServiceInput, PickUpDeliveryRouteInput, ToggleAdditionalServiceInput, ToggleTransportServiceInput, UpdateAdditionalServiceInput, UpdateRouteStopStatusInput, UpdateTransportServiceInput } from "./transport.input"
import { AdditionalServiceMySqlEntity, OrderMySqlEntity, RouteMySqlEntity, RouteStopMySqlEntity, TransportServiceMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Not, Repository } from "typeorm"
import { CreateAdditionalServiceOutput, CreateRouteOutput, CreateTransportOutput, PickUpDeliveryRouteOutput, ToggleAdditionalServiceOutput, ToggleTransportServiceOutput, UpdateAdditionalServiceOutput, UpdateRouteStopStatusOutput, UpdateTransportServiceOutput } from "./transport.output"
import { OrderStatus, RouteStatus, StopType, TransportType } from "@common"
import { provinces } from "src/common/utils/base.utils"


@Injectable()
export class TransportService {
    constructor(
        @InjectRepository(TransportServiceMySqlEntity)
        private readonly transportServiceMySqlRepository: Repository<TransportServiceMySqlEntity>,
        @InjectRepository(AdditionalServiceMySqlEntity)
        private readonly additionalServiceMySqlRepository: Repository<AdditionalServiceMySqlEntity>,
        @InjectRepository(RouteMySqlEntity)
        private readonly routeMySqlRepository: Repository<RouteMySqlEntity>,
        @InjectRepository(RouteStopMySqlEntity)
        private readonly routeStopMySqlRepository: Repository<RouteStopMySqlEntity>,
        @InjectRepository(OrderMySqlEntity)
        private readonly orderMySqlRepository: Repository<OrderMySqlEntity>,
    ) { }

    async createTransportService(input: CreateTransportServiceInput): Promise<CreateTransportOutput> {
        const { data } = input
        const { name, type, description, pricePerKg, pricePerKm } = data

        const transport: Partial<TransportServiceMySqlEntity> = {
            name,
            type,
            description,
            pricePerKg,
            pricePerKm
        }

        await this.transportServiceMySqlRepository.save(transport)

        return {
            message: "Transport Service has been created successfully"
        }

    }

    async updateTransportService(input: UpdateTransportServiceInput): Promise<UpdateTransportServiceOutput> {
        const { data } = input
        const { transportServiceId, name, type, description, pricePerKg, pricePerKm } = data

        const transport: Partial<TransportServiceMySqlEntity> = {
            name,
            type,
            description,
            pricePerKg,
            pricePerKm
        }

        await this.transportServiceMySqlRepository.update(transportServiceId, transport)

        return {
            message: "Transport Service has been updated successfully."
        }
    }

    async toggleTransportService(input: ToggleTransportServiceInput): Promise<ToggleTransportServiceOutput> {
        const { data } = input
        const { params } = data
        const { transportServiceId } = params

        const found = await this.transportServiceMySqlRepository.findOneBy({ transportServiceId })

        if (!found) {
            throw new NotFoundException("Transport service not found")
        }

        await this.additionalServiceMySqlRepository.update(transportServiceId, { isActive: !found.isActive })

        return {
            message: `This additional service is ${found.isActive ? "activated" : "disabled"}`
        }
    }

    async createRoute(input: CreateRouteInput): Promise<CreateRouteOutput> {
        const { data } = input
        const { driverId, routeStops } = data

        const { routeId } = await this.routeMySqlRepository.save({ driverId })

        const orderIds = routeStops.map(({orderId}) => orderId)

        for (const { orderId } of routeStops) {

            const order = await this.orderMySqlRepository.findOne({
                where: { orderId },
                relations: { transportService: true }
            })

            if (!order) {
                throw new Error(`Order with ID ${orderId} not found`)
            }

            const { transportService: { type }, fromAddress, toAddress, fromProvince } = order

            const stopsForOrder = [
                { routeId, orderId, address: fromAddress, stopType: StopType.PickUp }
            ]

            if (type === TransportType.Air) {
                const airportName = provinces.find(p => p.province === fromProvince)?.airport
                if (airportName) {
                    stopsForOrder.push({
                        routeId,
                        orderId,
                        address: `${airportName} Airport`,
                        stopType: StopType.PickUp
                    })
                }
            } else {
                stopsForOrder.push({
                    routeId,
                    orderId,
                    address: toAddress,
                    stopType: StopType.Delivery
                })
            }

            await this.routeStopMySqlRepository.save(stopsForOrder)
        }

        await this.orderMySqlRepository.update(orderIds, {orderStatus: OrderStatus.PendingPickUp})

        return {
            message: "New Transportation has been created successfully"
        }
    }

    async createAdditionalService(input: CreateAdditionalServiceInput): Promise<CreateAdditionalServiceOutput> {
        const { data } = input
        const { name, description, forTransportType, price } = data

        await this.additionalServiceMySqlRepository.save({
            name,
            description,
            forTransportType,
            price
        })

        return {
            message: "New additional service has been created successfully"
        }
    }

    async updateAdditionalService(input: UpdateAdditionalServiceInput): Promise<UpdateAdditionalServiceOutput> {
        const { data } = input
        const { additionalServiceId, name, description, forTransportType, price } = data

        const addserv: Partial<AdditionalServiceMySqlEntity> = {
            name,
            description,
            forTransportType,
            price
        }

        await this.additionalServiceMySqlRepository.update(additionalServiceId, addserv)

        return {
            message: "New additional service has been created successfully."
        }
    }

    async toggleAdditionalService(input: ToggleAdditionalServiceInput): Promise<ToggleAdditionalServiceOutput> {
        const { data } = input
        const { params } = data
        const { additionalServiceId } = params

        const found = await this.additionalServiceMySqlRepository.findOneBy({ additionalServiceId })

        if (!found) {
            throw new NotFoundException("Additional service not found")
        }

        await this.additionalServiceMySqlRepository.update(additionalServiceId, { isActive: !found.isActive })

        return {
            message: `This additional service is ${found.isActive ? "activated" : "disabled"}`
        }
    }

    async pickUpDeliveryRoute(input: PickUpDeliveryRouteInput): Promise<PickUpDeliveryRouteOutput> {
        const { accountId, data } = input
        const { routeId } = data

        const processingRoutes = await this.routeMySqlRepository.find({
            where: {
                driverId: accountId,
                status: Not(RouteStatus.Delivered)
            }
        })

        if (processingRoutes) {
            throw new ConflictException("You are currently taking 1 delivery route")
        }

        await this.routeMySqlRepository.update(routeId, {
            status: RouteStatus.Delivering,
            deliveryStartDate: new Date()
        })

        return {
            message: "Delivery Route picked up!, pay attention"
        }
    }

    async updateRouteStop (input : UpdateRouteStopStatusInput) : Promise<UpdateRouteStopStatusOutput> {
        const { data } = input
        const {} = data
        
        return {
            message: "Route's stop status updated."
        }
    }

}