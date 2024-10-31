import { Args, Query, Resolver } from "@nestjs/graphql"
import { AdditionalServiceMySqlEntity, TransportServiceMySqlEntity } from "@database"
import { TransportService } from "./transport.service"
import { FindAllTransportServiceInputData, FindManySuitableAdditionalServiceInputData, FindManySuitableTransportServiceInputData } from "./transport.input"
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

    @Query(() => [TransportServiceMySqlEntity])
    @UseGuards(JwtAuthGuard)
    async findAllTransportService(
        @AccountId() accountId: string,
        @Args("data") data: FindAllTransportServiceInputData
    ) {
        return this.transportService.findAllTransportService({ accountId, data })
    }

    @Query(() => [AdditionalServiceMySqlEntity])
    @UseGuards(JwtAuthGuard)
    async findManySuitableAdditionalService(
        @AccountId() accountId: string,
        @Args("data") data: FindManySuitableAdditionalServiceInputData
    ) {
        return this.transportService.findManySuitableAdditionalService({ accountId, data })
    }
}