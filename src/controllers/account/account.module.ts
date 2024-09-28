
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountMySqlEntity, RoleMySqlEntity } from "@database"
import { AccountsController } from "./account.controller"
import { AccountsService } from "./account.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountMySqlEntity,
            RoleMySqlEntity
        ]),
    ],
    controllers: [AccountsController],
    providers: [AccountsService],
})
export class AccountsModule {}
