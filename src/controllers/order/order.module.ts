import { AdditionalServiceMySqlEntity, FishQualificationMySqlEntity, OrderAdditionalServiceMySqlEntity, OrderFishMySqlEntity, OrderMySqlEntity, TransactionMySqlEntity, TransportServiceMySqlEntity } from "@database"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity } from "src/database/mysql/account.entity"
import { OrderController } from "./order.controller"
import { OrderService } from "./order.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountEntity,
            OrderMySqlEntity,
            OrderFishMySqlEntity,
            FishQualificationMySqlEntity,
            TransportServiceMySqlEntity,
            OrderAdditionalServiceMySqlEntity,
            AdditionalServiceMySqlEntity,
            TransactionMySqlEntity
        ]),
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
