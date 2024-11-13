import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountMySqlEntity, OrderMySqlEntity, TransactionMySqlEntity } from "@database"
import { TransactionController } from "./transaction.controller"
import { TransactionService } from "./transaction.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountMySqlEntity,
            OrderMySqlEntity,
            TransactionMySqlEntity
        ]),
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
