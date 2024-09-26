import { Query, Resolver } from "@nestjs/graphql"
import { AccountsService } from "./account.service"
import { Body } from "@nestjs/common"
import { FindOneAccountInput } from "./account.input"
import { AccountMySqlEntity } from "@database"

@Resolver()
export class AccountsResolver {
    constructor(
        private readonly accountsService: AccountsService
    ) { }

    @Query(() => AccountMySqlEntity)
    async findOneAccount(
        @Body() data: FindOneAccountInput
    ) {
        return this.accountsService.findOneAccount(data)
    }

}