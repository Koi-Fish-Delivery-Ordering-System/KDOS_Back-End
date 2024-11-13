import { AuthInput, TransactionType } from "@common"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTransactionInputData {
    @ApiProperty()
        orderId? : string
    @ApiProperty()
        type : TransactionType
    @ApiProperty()
        amount? : number
}

export class CreateTransactionInput implements AuthInput<CreateTransactionInputData> {
    accountId: string
    data: CreateTransactionInputData
}

export class UpdateTransactionInputData {
    @ApiProperty()
        transactionId : string
    @ApiProperty()
        vnp_ResponseCode : string
}

export class UpdateTransactionInput implements AuthInput<UpdateTransactionInputData> {
    accountId: string
    data: UpdateTransactionInputData
}