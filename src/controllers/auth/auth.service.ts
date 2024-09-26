import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { AccountMySqlEntity } from "src/database"
import { Repository } from "typeorm"
import { SignInInput, SignUpInput } from "./auth.input"
import { Sha256Service } from "@global"
import { SignUpOutput } from "./auth.output"



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AccountMySqlEntity)
        private readonly accountMySqlRepository: Repository<AccountMySqlEntity>,
        private readonly sha256Service: Sha256Service
    ) { }

    async signUp (input: SignUpInput) : Promise<SignUpOutput> {
        const existEmail = await this.accountMySqlRepository.findOneBy({ email: input.email })
        if (existEmail) {
            throw new ConflictException("Email already existed")
        }
        const existUsername = await this.accountMySqlRepository.findOneBy({username: input.username})
        if(existUsername) {
            throw new ConflictException("Username already in use")
        }

        const hashedPassword = this.sha256Service.createHash(input.password)
        input.password = hashedPassword
        await this.accountMySqlRepository.save(input)

        return {
            message : "Your Account has been created, please check your email to complete verification"
        }
    }

    async signIn (input: SignInInput) : Promise<void> {
        const { username, password } = input

        const existAccount = await this.accountMySqlRepository.findOneBy({username})
        
        if(!existAccount) {
            throw new NotFoundException("Account not found")
        }

        if (!this.sha256Service.verifyHash(password, existAccount.password))
            throw new UnauthorizedException("Invalid credentials.")
        if (existAccount.verified === false) {
            throw new UnauthorizedException("Your account is not verified, please check the verification email sent")
        }
    }
}