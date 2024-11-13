import { Module } from "@nestjs/common"
import { AccountsModule } from "./account"
import { AuthModule } from "./auth"
import { OrderModule } from "./order/order.module"
import { TransportModule } from "./transport/transport.module"
import { TransactionModule } from "./transaction/transaction.module"


@Module({
    imports: [
        AuthModule,
        AccountsModule,
        OrderModule,
        TransportModule,
        TransactionModule
    ],
    providers: []
})
export class ControllersModule {}
 