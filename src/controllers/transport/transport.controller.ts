import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { TransportService } from "./transport.service"
import { CreateAdditionalServiceInputData, CreateRouteInputData, CreateTransportServiceInputData, PickUpDeliveryRouteInputData, ToggleAdditionalServiceInputData, ToggleTransportServiceInputData, UpdateAdditionalServiceInputData, UpdateRouteStopStatusInputData, UpdateTransportServiceInputData } from "./transport.input"
import { AccountId, JwtAuthGuard } from "../shared"



@ApiTags("Transport")
@Controller("api/transport")
export class TransportController {
    constructor(
        private readonly transportService: TransportService
    ) { }

    @ApiBearerAuth()
    @Post("create-transport-service")
    @UseGuards(JwtAuthGuard)
    async createTransportService(
        @AccountId() accountId : string,
        @Body() data: CreateTransportServiceInputData
    ){
        return await this.transportService.createTransportService({ accountId, data })
    }

    @ApiBearerAuth()
    @Patch("update-transport-service")
    @UseGuards(JwtAuthGuard)
    async updateTransportService(
        @AccountId() accountId: string,
        @Body() data: UpdateTransportServiceInputData
    ){
        return await this.transportService.updateTransportService({accountId, data})
    }

    @ApiBearerAuth()
    @Patch("toggle-transport-service")
    @UseGuards(JwtAuthGuard)
    async toggleTransportService(
        @AccountId() accountId: string,
        @Body() data: ToggleTransportServiceInputData
    ){
        return await this.transportService.toggleTransportService({accountId, data})
    }

    @ApiBearerAuth()
    @Post("create-additional-service")
    @UseGuards(JwtAuthGuard)
    async createAdditionalService(
        @AccountId() accountId: string,
        @Body() data: CreateAdditionalServiceInputData
    ){
        return await this.transportService.createAdditionalService({accountId, data})
    }

    @ApiBearerAuth()
    @Patch("update-additional-service")
    @UseGuards(JwtAuthGuard)
    async updateAdditionalService(
        @AccountId() accountId: string,
        @Body() data: UpdateAdditionalServiceInputData
    ){
        return await this.transportService.updateAdditionalService({accountId, data})
    }

    @ApiBearerAuth()
    @Patch("toggle-additional-service")
    @UseGuards(JwtAuthGuard)
    async toggleAdditionalService(
        @AccountId() accountId: string,
        @Body() data: ToggleAdditionalServiceInputData
    ){
        return await this.transportService.toggleAdditionalService({accountId, data})
    }

    @ApiBearerAuth()
    @Post("create-route")
    @UseGuards(JwtAuthGuard)
    async createRoute(
        @AccountId() accountId: string,
        @Body() data: CreateRouteInputData
    ){
        return await this.transportService.createRoute({accountId, data})
    }

    @ApiBearerAuth()
    @Patch("pick-up-delivery-route")
    @UseGuards(JwtAuthGuard)
    async pickUpDeliveryRoute(
        @AccountId() accountId: string,
        @Body() data: PickUpDeliveryRouteInputData
    ){
        return await this.transportService.pickUpDeliveryRoute({ accountId, data })
    }

    @ApiBearerAuth()
    @Patch("update-route-stop-status")
    @UseGuards(JwtAuthGuard)
    async updateRouteStopStatus(
        @AccountId() accountId: string,
        @Body() data: UpdateRouteStopStatusInputData
    ){
        return await this.transportService.updateRouteStopStatus({ accountId, data })
    }
    
}