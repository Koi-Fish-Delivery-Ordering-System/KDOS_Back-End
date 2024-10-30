import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity } from "src/database/mysql/account.entity"
import { TransportController } from "./transport.controller"
import { TransportService } from "./transport.service"
import { AdditionalServiceMySqlEntity, OrderMySqlEntity, RouteMySqlEntity, RouteStopMySqlEntity, TransportServiceMySqlEntity } from "@database"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountEntity,
            OrderMySqlEntity,
            TransportServiceMySqlEntity,
            AdditionalServiceMySqlEntity,
            RouteMySqlEntity,
            RouteStopMySqlEntity
        ]),
    ],
    controllers: [TransportController],
    providers: [TransportService],
})
export class TransportModule {}
