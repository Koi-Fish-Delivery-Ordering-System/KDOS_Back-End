import { Body, Controller, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { TransportService } from "./transport.service"
import { CreateTransportServiceInput } from "./transport.input"



@ApiTags("Transport")
@Controller("api/transport")
export class TransportController {
    constructor(
        private readonly transportService: TransportService
    ) { }

    @Post("create-transport")
    async createTransportService(
        @Body() data: CreateTransportServiceInput
    ){
        return await this.transportService.createTransportService(data)
    }
}