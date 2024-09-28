import { Injectable, NotFoundException } from "@nestjs/common"
import { FindOneAccountInput } from "./account.input"
import { InjectRepository } from "@nestjs/typeorm"
import { AccountMySqlEntity } from "@database"
import { Repository } from "typeorm"

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(AccountMySqlEntity)
        private readonly accountMySqlRepository : Repository<AccountMySqlEntity>
    ) {}

    async findOneAccount(input: FindOneAccountInput) : Promise<AccountMySqlEntity> {
        const { accountId } = input

        const exist  = await this.accountMySqlRepository.findOne({
            where: {
                accountId
            }
        })

        if(!exist) {
            throw new NotFoundException("Account not found")
        }

        return exist
    }
}