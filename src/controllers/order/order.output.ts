import { Output } from "@common"

export class CreateOrderOutputOthers {
    paymentUrl : string
}

export class CreateOrderOutput implements Output<CreateOrderOutputOthers> {
    message: string
    others?: CreateOrderOutputOthers
}

export class UpdateOrderOutput implements Output {
    message: string
}

export class CreateOrderFeedBackOutput implements Output {
    message: string
} 

export class CancelOrderOutput implements Output {
    message: string
} 

export class ChangePaymentMethodOutput implements Output {
    message: string
} 
