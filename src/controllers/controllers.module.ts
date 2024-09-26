import { Module } from "@nestjs/common"
import { AccountsModule } from "./account"
import { AuthModule } from "./auth"


@Module({
    imports: [
        AuthModule,
        AccountsModule,
    ],
    providers: []
})
export class ControllersModule {}
 