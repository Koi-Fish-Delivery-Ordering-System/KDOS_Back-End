import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger"
import { OrderService } from "./order.service"
import { CancelOrderInputData, ChangePaymentMethodInputData, CreateOrderFeedBackInputData, CreateOrderInputData, UpdateOrderInputData } from "./order.input"
import { AccountId, DataFromBody } from "../shared/decorators"
import { JwtAuthGuard } from "../shared"
import { createOrderSchema } from "./order.schema"


@ApiTags("Orders")
@Controller("api/orders")
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiConsumes("multipart/form-data")
    @ApiBody({ schema: createOrderSchema })
    @Post("create-order")
    async createOrder(
        @AccountId() accountId: string,
        @DataFromBody() data: CreateOrderInputData,
    ) {
        return this.orderService.createOrder({
            accountId,
            data,
        })
    }

    @ApiBearerAuth()
    @Patch("update-order")
    async updateOrder(
        @AccountId() accountId: string,
        @Body() data: UpdateOrderInputData
    ) {
        return await this.orderService.updateOrder({ accountId, data })
    }

    @ApiBearerAuth()
    @Patch("create-order-feedback")
    @UseGuards(JwtAuthGuard)
    async createOrderFeedBack(
        @AccountId() accountId: string,
        @Body() data: CreateOrderFeedBackInputData
    ) {
        return await this.orderService.createOrderFeedBack({ accountId, data })
    }

    @ApiBearerAuth()
    @Patch("cancel-order")
    @UseGuards(JwtAuthGuard)
    async cancelOrder(
        @AccountId() accountId: string,
        @Body() data: CancelOrderInputData
    ) {
        return await this.orderService.cancelOrder({ accountId, data })
    }

    @ApiBearerAuth()
    @Patch("change-payment-method")
    @UseGuards(JwtAuthGuard)
    async changePaymentMethod(
        @AccountId() accountId: string,
        @Body() data: ChangePaymentMethodInputData
    ) {
        return await this.orderService.changePaymentMethod({ accountId, data })
    }
}