
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TransactionMySqlEntity } from "@database"
import { TransactionResolver } from "./transaction.resolver"
import { TransactionService } from "./transaction.service"



@Module({
    imports: [
        TypeOrmModule.forFeature([
            TransactionMySqlEntity
        ]),
    ],
    providers: [TransactionResolver, TransactionService],
})
export class TransactionModule {}
