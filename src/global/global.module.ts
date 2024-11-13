import { Global, Module } from "@nestjs/common"
import {
    AuthManagerService,
    Sha256Service,
    VnpayService,
} from "./services"
import { JwtService } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtStrategy } from "./strategies"
import { AccountMySqlEntity } from "@database"


@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountMySqlEntity
        ])
    ],
    exports: [
        JwtService,
        JwtStrategy,
        AuthManagerService,
        Sha256Service,
        VnpayService
    ],
    providers: [
        JwtService,
        JwtStrategy,
        AuthManagerService,
        Sha256Service,
        VnpayService
    ], 
})
export class GlobalModule { }
