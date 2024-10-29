import { AuthEmptyDataInput, AuthInput, ParamsOnly } from "@common"
import { Field, InputType } from "@nestjs/graphql"


export class FindManyUserOrderInput implements AuthEmptyDataInput {
    accountId: string
}

@InputType()
export class FindOneUserOrderInputParams {
    @Field(() => String)
        orderId : string
}

@InputType()
export class FindOneUserOrderInputData implements ParamsOnly<FindOneUserOrderInputParams>{
    @Field(() => FindOneUserOrderInputParams)
        params: FindOneUserOrderInputParams
}

export class FindOneUserOrderInput implements AuthInput<FindOneUserOrderInputData> {
    accountId: string
    data: FindOneUserOrderInputData
}

// export class FindManyPendingOrderInput implements AuthEmptyDataInput {
//     accountId: string
// }