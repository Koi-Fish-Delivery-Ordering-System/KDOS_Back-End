import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { UsersService } from "./user.service";

@ApiTags("Users")
// @ApiHeader({
//     name: "Client-Id",
//     description: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
// })
@Controller("api/users")
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post("/api/sample")
    async create(@Body() user: string){
        return ""
    }
}