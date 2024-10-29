import { Global, Module } from "@nestjs/common"
import {
    AuthManagerService,
    Sha256Service,
    StorageService} from "./services"
import { JwtService } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm"
import { RoleMySqlEntity } from "@database"
import { JwtStrategy } from "./strategies"


@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoleMySqlEntity
        ])
    ],
    exports: [
        JwtService,
        JwtStrategy,
        AuthManagerService,
        Sha256Service,
        StorageService
    ],
    providers: [
        JwtService,
        JwtStrategy,
        AuthManagerService,
        Sha256Service,
        StorageService
    ], 
})
export class GlobalModule { }
