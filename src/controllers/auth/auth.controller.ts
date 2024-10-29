import { Body, Controller, Post, UseInterceptors } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { SignInInput, SignUpInput } from "./auth.input"
import { GenerateAuthTokensInterceptor } from "../shared/interceptors/generate-auth-tokens.interceptor"



@ApiTags("Authentication")
@Controller("api/auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post("sign-in")
    @UseInterceptors(GenerateAuthTokensInterceptor)
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