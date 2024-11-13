
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AdditionalServiceMySqlEntity, DriverMySqlEntity, RouteMySqlEntity, TransportServiceMySqlEntity } from "@database"
import { TransportResolver } from "./transport.resolver"
import { TransportService } from "./transport.service"



@Module({
    imports: [
        TypeOrmModule.forFeature([
            TransportServiceMySqlEntity,
            AdditionalServiceMySqlEntity,
            RouteMySqlEntity,
            DriverMySqlEntity
        ]),
    ],
    providers: [TransportResolver, TransportService],
})
export class TransportModule {}
