import { Module } from "@nestjs/common"
import { AccountsModule } from "./accounts"
import { TransportModule } from "./transport/transport.module"
import { AuthModule } from "./auth"
import { OrderModule } from "./order/order.module"
import { TransactionModule } from "./transaction/transaction.module"

@Module({
    imports: [
        AccountsModule,
        AuthModule,
        TransportModule,
        OrderModule,
        TransactionModule
    ],
})
export class ResolversModule { }