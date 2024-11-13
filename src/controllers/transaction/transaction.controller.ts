import { Body, Controller, Get, Patch, Post, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { TransactionService } from "./transaction.service"
import { CreateTransactionInputData, UpdateTransactionInputData } from "./transaction.input"
import { AccountId, JwtAuthGuard } from "../shared"






@ApiTags("Transaction")
@Controller("api/transaction")
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService
    ) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post("create-transaction")
    async createTransaction(
        @AccountId() accountId: string,
        @Body() data : CreateTransactionInputData,
    ) { 
        return await this.transactionService.createTransaction({accountId, data})
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch("update-transaction")
    async updateTransaction(
        @AccountId() accountId: string,
        @Body() data : UpdateTransactionInputData
    ) { 
        return this.transactionService.updateTransaction({accountId, data})
    }

    @Get("result")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleVnpayResult(@Query() queryParams: any) : boolean {
        return this.transactionService.handleVnpayResult(queryParams)
    }
}