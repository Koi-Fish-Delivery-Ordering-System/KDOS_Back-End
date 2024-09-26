import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { AccountEntity } from "src/database/mysql/account.entity"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountEntity
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
