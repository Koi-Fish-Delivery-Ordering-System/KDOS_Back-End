import { AuthInput, FishGender, PaymentMethod, ServicePricingType } from "@common"
import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, Max, Min } from "class-validator"

export class AddFishInputData {
    @ApiProperty()
        name: string
    @ApiProperty()
        gender : FishGender
    @ApiProperty()
        species : string
    @ApiProperty()
        ageInMonth : number
    @ApiProperty()
        weight : number
    @ApiProperty()
        length : number
    @ApiProperty()
        description? : string
    @ApiProperty()
        qualifications : Array<string>
    @ApiProperty()
        fishImageUrl : string
}

export class CreateOrderInputData {
    @ApiProperty()
        fromAddress: string
    @ApiProperty()
        toAddress: string
    @ApiProperty()
        fromProvince: string
    @ApiProperty()
        toProvince: string
    @IsUUID()
    @ApiProperty()
        transportServiceId: string
    @ApiProperty()
        totalPrice : number
    @ApiProperty()
        receiverName : string
    @ApiProperty()
        receiverPhone : string
    @ApiProperty()
        notes : string
    @ApiProperty()
        paymentMethod : PaymentMethod
    @ApiProperty()
        servicePricingType : ServicePricingType
    @ApiProperty()
        additionalServiceIds? : Array<string>
    @ApiProperty()
        fishes : Array<AddFishInputData>
}

export class CreateOrderInput implements AuthInput<CreateOrderInputData> {
    accountId: string
    data: CreateOrderInputData
}

export class UpdateOrderInputData {
    @IsUUID("4")
    @ApiProperty()
        orderId : string
    @ApiProperty()
        totalPrice : number
    @ApiProperty()
        notes? : string
    @ApiProperty()
        selectedAdditionalService : Array<string>
    @ApiProperty()
        receiverName :string
    @ApiProperty()
        receiverPhone: string
    @ApiProperty()
        servicePricingType : ServicePricingType
}

export class UpdateOrderInput implements AuthInput<UpdateOrderInputData> {
    accountId: string
    data: UpdateOrderInputData
}

export class CreateOrderFeedBackInputData {
    @ApiProperty()
        orderId: string
    @ApiProperty()
    @Min(1)
    @Max(5)
        feedBackStars : number
    @ApiProperty()
        feedBackContent : string
}

export class CreateOrderFeedBackInput implements AuthInput<CreateOrderFeedBackInputData> {
    accountId: string
    data: CreateOrderFeedBackInputData
}

export class CancelOrderInputData {
    @ApiProperty()
        orderId : string
    @ApiProperty()
        reasonToCancel? : string
}

export class CancelOrderInput implements AuthInput<CancelOrderInputData> {
    accountId: string
    data: CancelOrderInputData
}

export class ChangePaymentMethodInputData {
    @ApiProperty()
        orderId : string
    @ApiProperty()
        paymentMethod : PaymentMethod
}

export class ChangePaymentMethodInput implements AuthInput<ChangePaymentMethodInputData> {
    accountId: string
    data: ChangePaymentMethodInputData
}