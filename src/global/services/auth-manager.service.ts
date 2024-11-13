import { AuthOutput, AuthTokens, AuthTokenType, Payload } from "@common"
import { jwtConfig } from "@config"
import { AccountMySqlEntity } from "@database"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JsonWebTokenError, JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Injectable()
export class AuthManagerService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(AccountMySqlEntity)
        private readonly accountMySqlRepository: Repository<AccountMySqlEntity>,
    ) { }

    async verifyToken(token: string): Promise<Payload> {
        try {
            return await this.jwtService.verifyAsync<Payload>(token, {
                secret: jwtConfig().secret
            })
        } catch (ex) {
            if (ex instanceof JsonWebTokenError) {
                throw new UnauthorizedException("Invalid token.")
            }
        }
    }

    async generateToken<T extends PayloadLike>(
        data: T,
        type: AuthTokenType,
    ) {

        const payload: PayloadLike = {
            accountId: data.accountId,
            accountRole: (type === AuthTokenType.Access) ? data.accountRole : undefined,
            type,
        }

        return await this.jwtService.signAsync(payload, {
            secret: jwtConfig().secret,
        })
    }

    async generateAuthTokens<T extends PayloadLike>(
        data: T,
    ): Promise<AuthTokens> {

        const accessToken = await this.generateToken(data, AuthTokenType.Access)

        return {
            accessToken
        }
    }

    async generateOutput<T extends object>(
        payload: PayloadLike,
        data: T,
        authTokensRequested: boolean,
    ): Promise<AuthOutput<T>> {
        const { accountId } = payload
        let { accountRole } = payload

        if (authTokensRequested) {
            const { role } = await this.accountMySqlRepository.findOneBy({ accountId })
            accountRole = role ?? undefined
        }

        const tokens = authTokensRequested
            ? await this.generateAuthTokens({ accountId, accountRole })
            : undefined
        return {
            data,
            tokens,
        }
    }

}

export interface PayloadLike {
    accountId: string,
    accountRole: string,
    type?: AuthTokenType
}