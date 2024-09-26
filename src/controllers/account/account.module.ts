
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountMySqlEntity } from "@database"
import { AccountsController } from "./account.controller"
import { AccountsService } from "./account.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountMySqlEntity
        ]),
    ],
    controllers: [AccountsController],
    providers: [AccountsService],
})
export class AccountsModule {}
