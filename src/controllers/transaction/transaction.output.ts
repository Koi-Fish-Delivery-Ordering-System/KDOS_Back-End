import { Output } from "@common"

export class CreateTransactionOutputOthers {
    paymentUrl : string
}

export class CreateTransactionOutput implements Output<CreateTransactionOutputOthers> {
    message: string
    others: CreateTransactionOutputOthers
}

export class UpdateTransactionOutput implements Output {
    message: string
}