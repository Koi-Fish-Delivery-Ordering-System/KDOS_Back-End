import { ConflictException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { AccountMySqlEntity, DriverMySqlEntity} from "src/database"
import { Repository } from "typeorm"
import { ChangePasswordInput, RegisterDriverInput, UpdateProfileInput } from "./account.input"
import { ChangePasswordOutput, RegisterDriverOutput, UpdateProfileOutput } from "./account.output"
import { Sha256Service } from "@global"

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(AccountMySqlEntity)
        private readonly accountMySqlRepository: Repository<AccountMySqlEntity>,
        @InjectRepository(DriverMySqlEntity)
        private readonly driverMySqlRepository: Repository<DriverMySqlEntity>,
        private readonly sha256Service: Sha256Service
    ) { }

    async updateProfile(input: UpdateProfileInput): Promise<UpdateProfileOutput> {
        const { accountId, data } = input
        const { address, fullName, email, phone, username } = data

        const profile: Partial<AccountMySqlEntity> = {
            address,
            email,
            phone,
            username,
            fullName
        }

        await this.accountMySqlRepository.update(accountId, profile)

        return {
            message: "Profile has been updated successfully"
        }
    }

    // async addRole(input: AddRoleInput): Promise<string> {
    //     const { data } = input
    //     const { addAccountId, name } = data

    //     const exist = await this.roleMySqlRepository.findOne({
    //         where: {
    //             accountId: addAccountId,
    //             name
    //         }
    //     })

    //     if (exist) {
    //         throw new ConflictException("Account already have this role")
    //     }

    //     await this.roleMySqlRepository.save({
    //         accountId: addAccountId,
    //         name
    //     })

    //     return "Role has been added to account successfully"
    // }

    async registerDriver(input: RegisterDriverInput): Promise<RegisterDriverOutput> {
        const { accountId, data } = input
        const { currentProvince } = data

        let driverAccount = await this.driverMySqlRepository.findOne({
            where: {
                driverId: accountId
            }
        })

        if (!driverAccount) {
            driverAccount = await this.driverMySqlRepository.save({ driverId: accountId, currentProvince })
            await this.accountMySqlRepository.update(accountId, { driver: driverAccount })
            // await this.roleMySqlRepository.save({
            //     accountId,
            //     name: SystemRoles.Delivery
            // })
        }

        return {
            message: "Promoted to driver"
        }
    }

    async changePassword(input: ChangePasswordInput): Promise<ChangePasswordOutput> {
        const { accountId, data } = input
        const { oldPassword, newPassword } = data

        const { password } = await this.accountMySqlRepository.findOne({
            where: {
                accountId
            }
        })

        const hashedPassword = this.sha256Service.createHash(oldPassword)
        console.log(password + " and " + hashedPassword)
        if (password !== hashedPassword) {
            throw new ConflictException("Old password is not correct")
        }

        const newHashedPassword = this.sha256Service.createHash(newPassword)

        await this.accountMySqlRepository.update(accountId, { password: newHashedPassword })

        return {
            message: "Password Changed Successfully"
        }
    }

    // async updateAccountRole(input: UpdateAccountRoleInput): Promise<UpdateAccountRoleOutput> {
    //     const { data } = input
    //     const { updateAccountRoleId, roleNames } = data

    //     await this.roleMySqlRepository.delete({ accountId: updateAccountRoleId, name: Not(SystemRoles.Customer) })

    //     const newRoles = roleNames.map((name) => ({
    //         accountId: updateAccountRoleId,
    //         name
    //     }))

    //     await this.roleMySqlRepository.save(newRoles)

    //     return {
    //         message: "Roles updated successfully",
    //     }
    // }


}