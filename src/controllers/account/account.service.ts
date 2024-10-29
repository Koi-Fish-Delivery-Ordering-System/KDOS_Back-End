import { ConflictException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { AccountMySqlEntity, DriverMySqlEntity, RoleMySqlEntity } from "src/database"
import { Repository } from "typeorm"
import { AddRoleInput, RegisterDriverInput, UpdateProfileInput } from "./account.input"
import { RegisterDriverOutput, UpdateProfileOutput } from "./account.output"

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(AccountMySqlEntity)
        private readonly accountMySqlRepository: Repository<AccountMySqlEntity>,
        @InjectRepository(DriverMySqlEntity)
        private readonly driverMySqlRepository: Repository<DriverMySqlEntity>,
        @InjectRepository(RoleMySqlEntity)
        private readonly roleMySqlRepository: Repository<RoleMySqlEntity>,
    ) { }

    async updateProfile (input: UpdateProfileInput) : Promise<UpdateProfileOutput> {
        const { accountId, data } = input
        const { address, email, phone, username } = data

        const profile : Partial<AccountMySqlEntity> = {
            address,
            email,
            phone,
            username
        }

        await this.accountMySqlRepository.update(accountId, profile)

        return {
            message : "Profile has been updated successfully"
        }
    }

    async addRole(input: AddRoleInput) : Promise<string> {
        const {data} = input
        const { addAccountId, name } = data

        const exist = await this.roleMySqlRepository.findOne({
            where:{
                accountId: addAccountId,
                name
            }
        })

        if (!exist) {
            throw new ConflictException("Account already have this role")
        }

        await this.roleMySqlRepository.save({
            accountId: addAccountId,
            name
        })

        return "Role has been added to account successfully"
    }

    async registerDriver(input: RegisterDriverInput) : Promise<RegisterDriverOutput> {
        const { accountId, data } = input
        const { currentProvince } = data

        let driverAccount = await this.driverMySqlRepository.findOne({
            where:{
                driverId : accountId
            }
        })

        if(!driverAccount) {
            driverAccount = await this.driverMySqlRepository.save({ driverId : accountId, currentProvince })
            await this.accountMySqlRepository.update(accountId, { driver: driverAccount })
        }

        return {
            message: "Promoted to driver"
        }
    }

    
}