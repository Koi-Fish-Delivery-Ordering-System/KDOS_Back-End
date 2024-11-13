import { AuthInput, RouteStatus, TransportType } from "@common"
import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"

export class CreateTransportServiceInputData {
    @ApiProperty()
        name: string
    @ApiProperty()
        type: TransportType
    @ApiProperty()
        description: string
    @ApiProperty()
        pricePerKm: number
    @ApiProperty()
        pricePerKg: number
    @ApiProperty()
        pricePerAmount: number
}

export class CreateTransportServiceInput implements AuthInput<CreateTransportServiceInputData> {
    accountId: string
    data: CreateTransportServiceInputData
}

export class UpdateTransportServiceInputData {
    @IsUUID("4")
    @ApiProperty()
        transportServiceId: string
    @ApiProperty()
        name?: string
    @ApiProperty()
        type?: TransportType
    @ApiProperty()
        description?: string
    @ApiProperty()
        pricePerKm?: number
    @ApiProperty()
        pricePerKg?: number
    @ApiProperty()
        pricePerAmount?: number
}

export class UpdateTransportServiceInput implements AuthInput<UpdateTransportServiceInputData> {
    accountId: string
    data: UpdateTransportServiceInputData
}


export class CreateAdditionalServiceInputData {
    @ApiProperty()
        name: string
    @ApiProperty()
        description: string
    @ApiProperty()
        forTransportType: TransportType
    @ApiProperty()
        price: number

}

export class CreateAdditionalServiceInput implements AuthInput<CreateAdditionalServiceInputData> {
    accountId: string
    data: CreateAdditionalServiceInputData
}

export class UpdateAdditionalServiceInputData {
    @ApiProperty()
        additionalServiceId: string
    @ApiProperty()
        name: string
    @ApiProperty()
        description: string
    @ApiProperty()
        forTransportType: TransportType
    @ApiProperty()
        price: number
}

export class UpdateAdditionalServiceInput implements AuthInput<UpdateAdditionalServiceInputData> {
    accountId: string
    data: UpdateAdditionalServiceInputData
}

export class ToggleAdditionalServiceInputData {
    @ApiProperty()
        additionalServiceId: string
}

export class ToggleAdditionalServiceInput implements AuthInput<ToggleAdditionalServiceInputData> {
    accountId: string
    data: ToggleAdditionalServiceInputData
}

export class ToggleTransportServiceInputData {
    @ApiProperty()
        transportServiceId: string
}

export class ToggleTransportServiceInput implements AuthInput<ToggleTransportServiceInputData> {
    accountId: string
    data: ToggleTransportServiceInputData
}

export class PickUpDeliveryRouteInputData {
    @ApiProperty()
        routeId : string
}

export class PickUpDeliveryRouteInput implements AuthInput<PickUpDeliveryRouteInputData> {
    accountId: string
    data: PickUpDeliveryRouteInputData  
}

export class UpdateRouteInputData {
    @ApiProperty()
        routeId : string
    @ApiProperty()
        driverId : string
    @ApiProperty()
        addOrderIds : Array<string>
}

export class UpdateRouteInput implements AuthInput<UpdateRouteInputData> {
    accountId: string
    data: UpdateRouteInputData
}

// export class CreateRouteStopInputData {
//     @ApiProperty()
//         orderId : string
// }

export class CreateRouteInputData {
    @ApiProperty()
        driverId : string
    @ApiProperty()
        orderIds : Array<string>
    @ApiProperty()
        notes? : string
}

export class CreateRouteInput implements AuthInput<CreateRouteInputData> {
    accountId: string
    data: CreateRouteInputData
}

export class UpdateRouteStopStatusInputData {
    @ApiProperty()
        routeStopId : string
    @ApiProperty()
        status : RouteStatus
}

export class UpdateRouteStopStatusInput implements AuthInput<UpdateRouteStopStatusInputData> {
    accountId: string
    data: UpdateRouteStopStatusInputData
}