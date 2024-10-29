import {
    AccountMySqlEntity,
    RoleMySqlEntity,
} from "@database"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthResolver } from "./auth.resolver"
import { AuthService } from "./auth.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountMySqlEntity,
            RoleMySqlEntity,
        ]),
    ],
    providers: [AuthResolver, AuthService],
})
export class AuthModule {}
