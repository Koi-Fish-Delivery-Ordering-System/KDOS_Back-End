import { AuthOutput } from "@common"
import { AuthManagerService } from "@global"

import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common"
import { Observable, mergeMap } from "rxjs"

@Injectable()
export class GenerateAuthTokensInterceptor<T extends object>
implements NestInterceptor<T, AuthOutput<T>>
{
    constructor(private readonly authManagerService: AuthManagerService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<AuthOutput<T>>> {
        return next.handle().pipe(
            mergeMap(async (data) => {
                const { tokens } = await this.authManagerService.generateOutput<T>(
                    {
                        accountId: data.accountId,
                        accountRole: data.role,
                    },
                    data,
                    true,
                )
                return {
                    tokens
                } as AuthOutput<T>
            }),
        )
    }
}
