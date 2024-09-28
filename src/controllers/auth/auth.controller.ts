import { Body, Controller, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { SignInInput, SignUpInput } from "./auth.input"


@ApiTags("Authentication")
@Controller("api/auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post("sign-in")
    async signIn(
        @Body() data: SignInInput
    ){
        return await this.authService.signIn(data)
    }

    @Post("sign-up")
    async signUp(
        @Body() data: SignUpInput
    ){
        return await this.authService.signUp(data)
    }
}