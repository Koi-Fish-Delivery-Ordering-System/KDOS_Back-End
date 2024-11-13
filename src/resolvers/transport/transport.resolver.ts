import { Args, Query, Resolver } from "@nestjs/graphql"
import { AdditionalServiceMySqlEntity, DriverMySqlEntity, RouteMySqlEntity, TransportServiceMySqlEntity } from "@database"
import { TransportService } from "./transport.service"
import { FindManySuitableAdditionalServiceInputData, FindManySuitableTransportServiceInputData } from "./transport.input"
import { AccountId, JwtAuthGuard } from "../shared"
import { UseGuards } from "@nestjs/common"

@Resolver()
export class TransportResolver {
    constructor(
        private readonly transportService: TransportService
    ) { }

    @Query(() => [TransportServiceMySqlEntity])
    async findManySuitableTransportService(@Args("data") data: FindManySuitableTransportServiceInputData) {
        return this.transportService.findManySuitableTransportService({ data })
    }

    @Query(() => [DriverMySqlEntity])
    @UseGuards(JwtAuthGuard)
    async findManyAvailableDriver() {
        return this.transportService.findManyAvailableDriver()
    }

    @Query(() => [RouteMySqlEntity])
    @UseGuards(JwtAuthGuard)
    async findManyRoutes() {
        return this.transportService.findManyRoutes()
    }

    @Query(() => [RouteMySqlEntity])
    @UseGuards(JwtAuthGuard)
    async findManyAssignedRoute(
        @AccountId() accountId : string,
    ) {
        return this.transportService.findManyAssignedRoute({ accountId })
    }

    @Query(() => RouteMySqlEntity)
    @UseGuards(JwtAuthGuard)
    async findOneDeliveringRoute(
        @AccountId() accountId : string,
    ) {
        return this.transportService.findOneDeliveringRoute({ accountId })
    }

    @Query(() => [TransportServiceMySqlEntity])
    async findAllTransportService() {
        return this.transportService.findAllTransportService()
    }

    @Query(() => [AdditionalServiceMySqlEntity])
    @UseGuards(JwtAuthGuard)
    async findAllAdditionalService() {
        return this.transportService.findAllAdditionalService()
    }

    @Query(() => [AdditionalServiceMySqlEntity])
    @UseGuards(JwtAuthGuard)
    async findManySuitableAdditionalService(
        @AccountId() accountId: string,
        @Args("data") data: FindManySuitableAdditionalServiceInputData
    ) {
        return this.transportService.findManySuitableAdditionalService({ accountId, data })
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [RouteMySqlEntity])
    async findManyCompletedRoute(
        @AccountId() accountId: string,
    ) {
        return this.transportService.findManyCompletedRoute({ accountId })
    }

}