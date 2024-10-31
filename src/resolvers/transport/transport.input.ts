import { AuthInput, Input, OptionsOnly, RouteStatus, TransportType } from "@common"
import { Field, InputType, Int } from "@nestjs/graphql"

@InputType()
export class FindManySuitableTransportServiceInputData {
    @Field(() => String)
        fromProvince: string
    @Field(() => String)
        toProvince: string
}

export class FindManySuitableTransportServiceInput implements Input<FindManySuitableTransportServiceInputData> {
    data: FindManySuitableTransportServiceInputData
}

@InputType()
export class FindManySuitableTransportServiceInputOptions {

    @Field(() => Int, {nullable: true})
        skip? : number

    @Field(() => Int, {nullable : true})
        take? : number
}

@InputType()
export class FindAllTransportServiceInputData implements OptionsOnly<FindManySuitableTransportServiceInputOptions> {
    @Field(() => FindManySuitableTransportServiceInputOptions)
        options: FindManySuitableTransportServiceInputOptions
} 

export class FindAllTransportServiceInput implements AuthInput<FindAllTransportServiceInputData> {
    accountId: string
    data: FindAllTransportServiceInputData
}

@InputType()
export class FindManySuitableAdditionalServiceInputData {
    @Field(() => String)
        transportType : TransportType
}

export class FindManySuitableAdditionalServiceInput implements AuthInput<FindManySuitableAdditionalServiceInputData> {
    accountId: string
    data: FindManySuitableAdditionalServiceInputData
}

@InputType()
export class FindManyStatusRouteInputOptions {
    @Field(() => String)
        status : RouteStatus
}

@InputType()
export class FindManyStatusRouteInputData implements OptionsOnly<FindManyStatusRouteInputOptions> {
    @Field(() => FindManyStatusRouteInputOptions)
        options: FindManyStatusRouteInputOptions
}

export class FindManyStatusRouteInput implements AuthInput<FindManyStatusRouteInputData> {
    accountId: string
    data: FindManyStatusRouteInputData
}