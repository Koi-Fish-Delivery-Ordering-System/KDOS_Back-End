import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AccountsService } from "./account.service"
import { ChangePasswordInputData, RegisterDriverInputData, UpdateProfileInputData } from "./account.input"
import { AccountId, JwtAuthGuard } from "../shared"

@ApiTags("Accounts")
@Controller("api/accounts")
export class AccountsController {
    constructor(
        private readonly accountService: AccountsService
    ) { }

    @Patch("update-profile")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async updateProfile(
        @AccountId() accountId : string,
        @Body() data: UpdateProfileInputData
    ){
        return await this.accountService.updateProfile({ accountId, data })
    }

    // @Post("add-role")
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    // async addRole(
    //     @AccountId() accountId : string,
    //     @Body() data: AddRoleInputData
    // ) {
    //     return await this.accountService.addRole({ accountId, data })
    // }

    @Post("register-drvier")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async registerDriver(
        @AccountId() accountId : string,
        @Body() data: RegisterDriverInputData
    ) {
        return await this.accountService.registerDriver({ accountId, data })
    }

    @Patch("change-password")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async changePassword(
        @AccountId() accountId : string,
        @Body() data: ChangePasswordInputData
    ) {
        return await this.accountService.changePassword({ accountId, data })
    }
}