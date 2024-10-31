import { UseGuards } from "@nestjs/common"
import { Args, Query, Resolver } from "@nestjs/graphql"
import { AccountId, JwtAuthGuard } from "../shared"
import { OrderMySqlEntity } from "@database"
import { OrderService } from "./order.service"
import { FindOneUserOrderInputData } from "./order.input"

@Resolver()
export class OrderResolver {
    constructor(private readonly orderService: OrderService) { }

    @UseGuards(JwtAuthGuard)
    @Query(() => [OrderMySqlEntity])
    async findManyUserOrder(@AccountId() accountId: string) {
        return this.orderService.findManyUserOrder({ accountId })
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [OrderMySqlEntity])
    async findOneUserOrder(
        @AccountId() accountId: string,
        @Args("data") data: FindOneUserOrderInputData) {
        return this.orderService.findOneUserOrder({ accountId, data })
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [OrderMySqlEntity])
    async findManyProcessingOrder(
    ) {
        return this.orderService.findManyProcessingOrder()
    }

}
