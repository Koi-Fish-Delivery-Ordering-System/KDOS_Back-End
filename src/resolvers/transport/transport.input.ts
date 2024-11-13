import { AuthEmptyDataInput, AuthInput, Input, TransportType } from "@common"
import { Field, InputType } from "@nestjs/graphql"

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
export class FindManySuitableAdditionalServiceInputData {
    @Field(() => String)
        transportType : TransportType
}

export class FindManySuitableAdditionalServiceInput implements AuthInput<FindManySuitableAdditionalServiceInputData> {
    accountId: string
    data: FindManySuitableAdditionalServiceInputData
}

export class FindManyAssignedRouteInput implements AuthEmptyDataInput{
    accountId: string
}

export class FindManyAvailableDriverInput implements AuthEmptyDataInput {
    accountId: string
}

export class FindOneDeliveringRouteInput implements AuthEmptyDataInput {
    accountId: string
}

export class FindManyCompletedRouteInput implements AuthEmptyDataInput {
    accountId: string
}