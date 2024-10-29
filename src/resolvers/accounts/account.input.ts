import { AuthInput } from "@common"
import { Field } from "@nestjs/graphql"

export class FindOneAccountInput {
    accountId : string
}

export class FindManyDriverByProvinceInputData {
    @Field(() => String)
        currentProvince : string
}

export class FindManyDriverByProvinceInput implements AuthInput<FindManyDriverByProvinceInputData>{
    accountId: string
    data: FindManyDriverByProvinceInputData
}