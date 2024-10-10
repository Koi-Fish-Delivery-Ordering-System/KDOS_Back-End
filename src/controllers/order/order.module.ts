import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity } from "src/database/mysql/account.entity"
import { OrderController } from "./order.controller"
import { OrderService } from "./order.service"
import { AdditionalServiceMySqlEntity, FishHealthMySqlEntity, FishQualificationMySqlEntity, OrderAdditionalServiceMySqlEntity, OrderFishMySqlEntity, TransportServiceMySqlEntity } from "@database"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountEntity,
            OrderFishMySqlEntity,
            FishQualificationMySqlEntity,
            FishHealthMySqlEntity,
            TransportServiceMySqlEntity,
            OrderAdditionalServiceMySqlEntity,
            AdditionalServiceMySqlEntity

        ]),
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
