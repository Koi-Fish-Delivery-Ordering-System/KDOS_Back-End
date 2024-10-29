import { Body, Controller, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger"
import { OrderService } from "./order.service"
import { CreateOrderInputData, UpdateOrderInputData } from "./order.input"
import { AccountId, DataFromBody } from "../shared/decorators"
import { JwtAuthGuard } from "../shared"
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { createOrderSchema } from "./order.schema"
import { Files } from "@common"

@ApiTags("Orders")
@Controller("api/orders")
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @ApiBody({ schema: createOrderSchema })
    @Post("create-order")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileFieldsInterceptor([{ name: "files" }]),
    )
    async createOrder(
        @AccountId() accountId: string,
        @DataFromBody() data: CreateOrderInputData,
        @UploadedFiles() { files }: Files,
    ) {
        console.log(files ?? "deo co")
        return this.orderService.createOrder({
            accountId,
            data,
            files,
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
}