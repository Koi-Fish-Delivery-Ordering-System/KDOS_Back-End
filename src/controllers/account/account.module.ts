
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountMySqlEntity, DriverMySqlEntity, OrderMySqlEntity, RoleMySqlEntity } from "@database"
import { AccountsController } from "./account.controller"
import { AccountsService } from "./account.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountMySqlEntity,
            RoleMySqlEntity,
            OrderMySqlEntity,
            DriverMySqlEntity
        ]),
    ],
    controllers: [AccountsController],
    providers: [AccountsService],
})
export class AccountsModule {}
