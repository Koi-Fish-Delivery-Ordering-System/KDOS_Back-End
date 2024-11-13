import {
    AccountMySqlEntity,
    DriverMySqlEntity,
    OrderMySqlEntity,
    RouteMySqlEntity,
    RouteStopMySqlEntity,
} from "@database"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { OrderResolver } from "./order.resolver"
import { OrderService } from "./order.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountMySqlEntity,
            OrderMySqlEntity,
            DriverMySqlEntity,
            RouteMySqlEntity,
            RouteStopMySqlEntity
        ]),
    ],
    providers: [OrderResolver, OrderService],
})
export class OrderModule {}
