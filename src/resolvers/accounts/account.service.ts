import { Injectable, NotFoundException } from "@nestjs/common"
import { FindManyDriverByProvinceInput, FindOneAccountInput } from "./account.input"
import { InjectRepository } from "@nestjs/typeorm"
import { AccountMySqlEntity, DriverMySqlEntity } from "@database"
import { In, Repository } from "typeorm"
import { DriverStatus } from "@common"

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(AccountMySqlEntity)
        private readonly accountMySqlRepository : Repository<AccountMySqlEntity>,
        @InjectRepository(DriverMySqlEntity)
        private readonly driverMySqlRepository : Repository<DriverMySqlEntity>
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

    async findManyDriverByProvince (input: FindManyDriverByProvinceInput) : Promise<Array<DriverMySqlEntity>> {
        const { data } = input
        const { currentProvince } = data

        const results = await this.driverMySqlRepository.find({
            where:{
                currentProvince: currentProvince,
                status: In([DriverStatus.Idle, DriverStatus.Ready])
            }
        })

        return results

    }
}