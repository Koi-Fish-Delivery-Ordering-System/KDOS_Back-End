import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { CreateAdditionalServiceInput, CreateRouteInput, CreateTransportServiceInput, PickUpDeliveryRouteInput, ToggleAdditionalServiceInput, ToggleTransportServiceInput, UpdateAdditionalServiceInput, UpdateTransportServiceInput } from "./transport.input"
import { AdditionalServiceMySqlEntity, OrderMySqlEntity, RouteMySqlEntity, RouteStopMySqlEntity, TransportServiceMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Not, Repository } from "typeorm"
import { CreateAdditionalServiceOutput, CreateRouteOutput, CreateTransportOutput, PickUpDeliveryRouteOutput, ToggleAdditionalServiceOutput, ToggleTransportServiceOutput, UpdateAdditionalServiceOutput, UpdateTransportServiceOutput } from "./transport.output"
import { OrderStatus, RouteStatus } from "@common"


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

        await this.routeMySqlRepository.save({
            driverId,
        })

        const promises: Array<Promise<void>> = []
        for (const destination of routeStops) {
            const { orderId, position } = destination
            const promise = async () => {
                const stop = await this.routeStopMySqlRepository.save({
                    routeStopId: orderId,
                    position
                })
    
                await this.orderMySqlRepository.update(orderId, {
                    orderStatus: OrderStatus.PendingPickUp,
                    atRouteStop: stop
                })
            }
            promises.push(promise())
        }
        await Promise.all(promises)

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

}