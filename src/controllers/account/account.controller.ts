import { Body, Controller, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AccountsService } from "./account.service"

@ApiTags("Users")
// @ApiHeader({
//     name: "Client-Id",
//     description: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
// })
@Controller("api/accounts")
export class AccountsController {
    constructor(
        private readonly userService: AccountsService
    ) { }

    // @Post("/")
    // async create(@Body() user: string){
    //     return ""
    // }
}