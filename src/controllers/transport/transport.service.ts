import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { CreateAdditionalServiceInput, CreateRouteInput, CreateTransportServiceInput, PickUpDeliveryRouteInput, ToggleAdditionalServiceInput, ToggleTransportServiceInput, UpdateAdditionalServiceInput, UpdateRouteInput, UpdateRouteStopStatusInput, UpdateTransportServiceInput } from "./transport.input"
import { AdditionalServiceMySqlEntity, DriverMySqlEntity, OrderMySqlEntity, RouteMySqlEntity, RouteStopMySqlEntity, TransportServiceMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { CreateAdditionalServiceOutput, CreateRouteOutput, CreateTransportOutput, PickUpDeliveryRouteOutput, ToggleAdditionalServiceOutput, ToggleTransportServiceOutput, UpdateAdditionalServiceOutput, UpdateRouteOutput, UpdateRouteStopStatusOutput, UpdateTransportServiceOutput } from "./transport.output"
import { DriverStatus, OrderStatus, RouteStatus, StopType, TransportType } from "@common"
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
        @InjectRepository(DriverMySqlEntity)
        private readonly driverMySqlRepository: Repository<DriverMySqlEntity>,
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
        const { transportServiceId, name, type, description, pricePerKg, pricePerKm, pricePerAmount } = data

        const transport: Partial<TransportServiceMySqlEntity> = {
            name,
            type,
            description,
            pricePerKg,
            pricePerKm,
            pricePerAmount
        }

        await this.transportServiceMySqlRepository.update(transportServiceId, transport)

        return {
            message: "Transport Service has been updated successfully."
        }
    }

    async toggleTransportService(input: ToggleTransportServiceInput): Promise<ToggleTransportServiceOutput> {
        const { data } = input
        const { transportServiceId } = data

        const found = await this.transportServiceMySqlRepository.findOneBy({ transportServiceId })

        if (!found) {
            throw new NotFoundException("Transport service not found")
        }

        await this.transportServiceMySqlRepository.update(transportServiceId, { isActive: !found.isActive })

        return {
            message: `This transport service is ${found.isActive ? "activated" : "disabled"}`
        }
    }

    async createRoute(input: CreateRouteInput): Promise<CreateRouteOutput> {
        const { data } = input
        const { driverId, orderIds, notes } = data

        const { routeId } = await this.routeMySqlRepository.save({ driverId, notes })

        for (const orderId of orderIds) {

            const order = await this.orderMySqlRepository.findOne({
                where: { orderId },
                relations: { transportService: true }
            })

            if (!order) {
                throw new NotFoundException(`Order with ID ${orderId} not found`)
            }

            if (order.orderStatus !== OrderStatus.Completed) {
                const { transportService: { type }, fromAddress, toAddress, fromProvince, toProvince } = order

                const stopsForOrder = []


                if (type === TransportType.Air) {
                    const airportName = provinces.find(p => p.province === fromProvince)?.airport
                    const firstAirpot = await this.routeStopMySqlRepository.findOne({
                        where: {
                            address: `${airportName} Airport`
                        }
                    })

                    if (!firstAirpot) {
                        stopsForOrder.push(
                            {
                                routeId,
                                orderId,
                                address: fromAddress,
                                stopType: StopType.PickUp

                            },
                            {
                                routeId,
                                orderId,
                                address: `${airportName} Airport`,
                                stopType: StopType.Delivery
                            })

                    } else {
                        const airportName = provinces.find(p => p.province === toProvince)?.airport
                        if (airportName) {
                            stopsForOrder.push(
                                {
                                    routeId,
                                    orderId,
                                    address: `${airportName} Airport`,
                                    stopType: StopType.PickUp
                                },
                                {
                                    routeId,
                                    orderId,
                                    address: toAddress,
                                    stopType: StopType.Delivery

                                },
                            )
                        }
                    }

                } else {
                    stopsForOrder.push(
                        {
                            routeId,
                            orderId,
                            address: fromAddress,
                            stopType: StopType.PickUp

                        },
                        {
                            routeId,
                            orderId,
                            address: toAddress,
                            stopType: StopType.Delivery
                        })
                }

                await this.routeStopMySqlRepository.save(stopsForOrder)
            }

            await this.orderMySqlRepository.update(orderIds, { orderStatus: OrderStatus.PendingPickUp })
        }


        return {
            message: "New route has been created successfully."
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
        const { additionalServiceId } = data

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
            }
        })

        if (processingRoutes.some(({ status }) => status === RouteStatus.Delivering)) {
            throw new ConflictException("You are currently taking 1 delivery route")
        }

        const route = await this.routeMySqlRepository.findOne({
            where: {
                routeId,
                driverId: accountId,
            },
            relations: {
                routeStops: {
                    order: true
                }
            }
        })

        if (!route) {
            throw new NotFoundException("Route Not Found or not assigned to you")
        }

        const { status, routeStops } = route

        if (status !== RouteStatus.Pending) {
            throw new ConflictException("Already processed this route")
        }

        const orderIds = routeStops.map(({ orderId }) => orderId)

        await this.orderMySqlRepository.update(orderIds, { orderStatus: OrderStatus.Delivering })

        await this.routeMySqlRepository.update(routeId, {
            status: RouteStatus.Delivering,
            deliveryStartDate: new Date()
        })

        await this.driverMySqlRepository.update({ driverId: accountId }, { status: DriverStatus.Delivering })

        return {
            message: "Delivery Route picked up!, pay attention"
        }
    }

    async updateRouteStopStatus(input: UpdateRouteStopStatusInput): Promise<UpdateRouteStopStatusOutput> {
        const { data } = input
        const { routeStopId, status } = data

        const routeStop = await this.routeStopMySqlRepository.findOne({
            where: { routeStopId },
            relations: {
                order: {
                    transportService: true,
                    routeStops: true
                },
                route: {
                    routeStops: true
                }
            }
        })

        if (!routeStop) {
            throw new NotFoundException("Not Found Route Stop")
        }

        const { stopType, order, orderId, route, routeId } = routeStop
        const pickUpStopCompleted = order.routeStops
            .filter(({ stopType }) => stopType === StopType.PickUp)
            .every(({ status }) => status === RouteStatus.Completed)

        if (stopType === StopType.PickUp && status === RouteStatus.Delivering) {
            await this.orderMySqlRepository.update(orderId, { orderStatus: OrderStatus.Delivering })
        }

        if (stopType === StopType.Delivery && status === RouteStatus.Delivering) {
            if (!pickUpStopCompleted) {
                throw new ConflictException("You have to complete picking up this order first")
            }
        }

        await this.routeStopMySqlRepository.update(routeStopId, { status })

        if (status === RouteStatus.Completed) {
            if(stopType === StopType.PickUp) {
                if (order.transportService.type === TransportType.Road) {
                    await this.driverMySqlRepository.update({ driverId: route.driverId }, { currentProvince: order.fromProvince })
                } else if (order.transportService.type === TransportType.Air) {
                    await this.driverMySqlRepository.update({ driverId: route.driverId }, { currentProvince: order.toProvince })
                }
            } else {
                if (order.transportService.type === TransportType.Road) {
                    await this.driverMySqlRepository.update({ driverId: route.driverId }, { currentProvince: order.toProvince })
                } else if (order.transportService.type === TransportType.Air) {
                    await this.driverMySqlRepository.update({ driverId: route.driverId }, { currentProvince: order.fromProvince })
                }
            }   
        }

        const routeAfterUpdate = await this.routeStopMySqlRepository.findOne({
            where: {
                routeStopId
            },
            relations: {
                route: {
                    routeStops: true
                }
            }
        })

        const routeStopsForOrder = routeAfterUpdate.route.routeStops.filter(rs => rs.orderId === orderId)

        const allCompleted = routeStopsForOrder.every(rs => rs.status === RouteStatus.Completed)

        if (allCompleted) {
            if (order.transportService.type === TransportType.Air) {
                const airportStop = await this.routeStopMySqlRepository.findOne({
                    where: {
                        stopType: StopType.PickUp,
                        address: `${provinces.find(p => p.province === order.toProvince)?.airport} Airport`
                    }
                })

                if (airportStop) {
                    await this.orderMySqlRepository.update(orderId, { orderStatus: OrderStatus.Completed })
                }

            } else {
                await this.orderMySqlRepository.update(orderId, { orderStatus: OrderStatus.Completed })
            }
        }

        const allRouteStopsCompleted = routeAfterUpdate.route.routeStops.every(rs => rs.status === RouteStatus.Completed)

        if (allRouteStopsCompleted) {
            await this.routeMySqlRepository.update(routeId, { status: RouteStatus.Completed })
            await this.driverMySqlRepository.update({ driverId: route.driverId }, { status: DriverStatus.Ready })
        }

        return {
            message: "Route's stop status updated."
        }
    }


    async updateRoute(input: UpdateRouteInput): Promise<UpdateRouteOutput> {
        const { data } = input
        const { routeId, driverId, addOrderIds } = data

        const route = await this.routeMySqlRepository.findOne({
            where: { routeId }
        })

        if (!route) {
            throw new NotFoundException("Route not found")
        }

        if (route.status === RouteStatus.Completed) {
            throw new ConflictException("This route is already completed")
        }

        if (driverId && route.status !== RouteStatus.Pending) {
            throw new ConflictException("Can't change driver once the route is picked up by another driver.")
        }

        if (addOrderIds && addOrderIds.length > 0) {
            // Truy vấn tất cả các đơn hàng liên quan một lần
            const orders = await this.orderMySqlRepository.find({
                where: {
                    orderId: In(addOrderIds)
                },
                relations: { transportService: true, routeStops: true }
            })

            // Lưu các routeStop sẽ được thêm vào
            const newRouteStops = []

            for (const order of orders) {
                const { orderId, transportService, fromAddress, fromProvince, toProvince, toAddress, routeStops } = order

                if (transportService.type === TransportType.Air) {
                    const hasFirstHalfStops = routeStops.some(
                        stop => stop.stopType === StopType.PickUp && stop.address === fromAddress
                    ) && routeStops.some(
                        stop => stop.stopType === StopType.Delivery && stop.address === `${fromProvince} Airport`
                    )

                    if (hasFirstHalfStops) {
                        newRouteStops.push(
                            {
                                routeId,
                                orderId,
                                address: `${toProvince} Airport`,
                                stopType: StopType.PickUp
                            },
                            {
                                routeId,
                                orderId,
                                address: toAddress,
                                stopType: StopType.Delivery
                            }
                        )
                    } else {
                        newRouteStops.push(
                            {
                                routeId,
                                orderId,
                                address: fromAddress,
                                stopType: StopType.PickUp
                            },
                            {
                                routeId,
                                orderId,
                                address: `${fromAddress} Airport`,
                                stopType: StopType.Delivery
                            }
                        )
                    }
                } else {
                    newRouteStops.push(
                        {
                            routeId,
                            orderId,
                            address: fromAddress,
                            stopType: StopType.PickUp
                        },
                        {
                            routeId,
                            orderId,
                            address: toAddress,
                            stopType: StopType.Delivery
                        }
                    )
                }
            }

            if (newRouteStops.length > 0) {
                await this.routeStopMySqlRepository.save(newRouteStops)
            }
        }

        return {
            message: "Route updated successfully."
        }
    }

}