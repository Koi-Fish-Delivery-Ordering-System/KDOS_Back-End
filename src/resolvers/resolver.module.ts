import { Module } from "@nestjs/common"
import { AccountsModule } from "./accounts"

@Module({
    imports: [AccountsModule],
})
export class ResolversModule { }