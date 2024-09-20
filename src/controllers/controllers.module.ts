import { Module } from "@nestjs/common"
import { UsersModule } from "./user";


@Module({
    imports: [
        UsersModule,
    ],
    providers: []
})
export class ControllersModule {}
 