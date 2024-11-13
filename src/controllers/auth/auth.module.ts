import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { AccountMySqlEntity } from "@database"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountMySqlEntity,
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
