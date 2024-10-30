import { Module } from "@nestjs/common"
import { AccountsModule } from "./account"
import { AuthModule } from "./auth"
import { OrderModule } from "./order/order.module"
import { TransportModule } from "./transport/transport.module"
import { AssetsModule } from "./assets/assets.module"


@Module({
    imports: [
        AuthModule,
        AssetsModule,
        AccountsModule,
        OrderModule,
        TransportModule
    ],
    providers: []
})
export class ControllersModule {}
 