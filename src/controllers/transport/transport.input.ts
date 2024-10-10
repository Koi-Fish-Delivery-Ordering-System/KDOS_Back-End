import { TransportType } from "@common"
import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"

export class CreateTransportServiceInput {
    @ApiProperty()
        name : string
    @ApiProperty()
        type: TransportType
    @ApiProperty()
        description: string
    @ApiProperty()
        pricePerKm : number
    @ApiProperty()
        pricePerKg : number
    @ApiProperty()
        pricePerAmount : number
}

export class UpdateTransportServiceInput {
    @IsUUID("4")
    @ApiProperty()
        transportServiceId : string
    @ApiProperty()
        name? : string
    @ApiProperty()
        type? : TransportType
    @ApiProperty()
        description? : string
    @ApiProperty()
        pricePerKm? : number
    @ApiProperty()
        pricePerKg? : number
    @ApiProperty()
        pricePerAmount? : number
}
