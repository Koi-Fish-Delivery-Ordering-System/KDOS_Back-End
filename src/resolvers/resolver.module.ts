import { Module } from "@nestjs/common"
import { AccountsModule } from "./accounts"
import { TransportModule } from "./transport/transport.module"
import { AuthModule } from "./auth"
import { OrderModule } from "./order/order.module"

@Module({
    imports: [
        AccountsModule,
        AuthModule,
        TransportModule,
        OrderModule
    ],
})
export class ResolversModule { }