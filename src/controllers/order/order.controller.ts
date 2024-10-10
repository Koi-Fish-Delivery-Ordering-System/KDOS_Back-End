import { Body, Controller, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { OrderService } from "./order.service"
import { CreateOrderInput } from "./order.input"


@ApiTags("Orders")
@Controller("api/orders")
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @Post("/")
    async createOrder(
        @Body() data: CreateOrderInput
    ){
        return await this.orderService.createOrder(data)
    }
}