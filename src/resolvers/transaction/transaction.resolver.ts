import { Query, Resolver } from "@nestjs/graphql"
import { TransactionService } from "./transaction.service"
import { UseGuards } from "@nestjs/common"
import { AccountId, JwtAuthGuard } from "../shared"
import { TransactionMySqlEntity } from "@database"


@Resolver()
export class TransactionResolver {
    constructor(
        private readonly transactionService: TransactionService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Query(() => [TransactionMySqlEntity])
    async findManyTransaction(
        @AccountId() accountId: string,
    ) {
        return this.transactionService.findManyTransaction({ accountId })
    }
}