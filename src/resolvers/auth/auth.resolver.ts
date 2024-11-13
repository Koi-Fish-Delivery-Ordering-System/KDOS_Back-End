import { UseGuards } from "@nestjs/common"
import { Query, Resolver } from "@nestjs/graphql"
import { AccountId, JwtAuthGuard } from "../shared"
import { AuthService } from "./auth.service"
import { AccountMySqlEntity } from "@database"
import { InitReportOutput } from "./auth.output"

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Query(() => AccountMySqlEntity)
    async init(@AccountId() accountId: string) {
        return this.authService.init({ accountId })
    }

  @UseGuards(JwtAuthGuard)
  @Query(() => InitReportOutput)
  async initReport() {
      return this.authService.initReport()
  }
}
