import { AdditionalServiceMySqlEntity, FishHealthMySqlEntity, FishQualificationMySqlEntity, OrderAdditionalServiceMySqlEntity, OrderFishMySqlEntity, OrderMySqlEntity, TransportServiceMySqlEntity } from "@database"
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
            FishHealthMySqlEntity,
            TransportServiceMySqlEntity,
            OrderAdditionalServiceMySqlEntity,
            AdditionalServiceMySqlEntity,
        ]),
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
