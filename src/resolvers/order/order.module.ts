import {
    AccountMySqlEntity,
    OrderMySqlEntity,
    RoleMySqlEntity,
} from "@database"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { OrderResolver } from "./order.resolver"
import { OrderService } from "./order.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountMySqlEntity,
            RoleMySqlEntity,
            OrderMySqlEntity
        ]),
    ],
    providers: [OrderResolver, OrderService],
})
export class OrderModule {}
