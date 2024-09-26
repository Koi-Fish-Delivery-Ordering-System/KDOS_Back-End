
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountMySqlEntity } from "@database"
import { AccountsService } from "./account.service"
import { AccountsResolver } from "./account.resolver"


@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountMySqlEntity
        ]),
    ],
    providers: [AccountsResolver, AccountsService],
})
export class AccountsModule {}
