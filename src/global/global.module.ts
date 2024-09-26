import {
    AccountMySqlEntity
} from "@database"
import { Global, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
    Sha256Service} from "./services"


@Global()
@Module({
    imports: [
        // TypeOrmModule.forFeature([
        //     AccountMySqlEntity,
        // ])
    ],
    exports: [
        Sha256Service,
    ],
    providers: [
        Sha256Service,
    ], 
})
export class GlobalModule { }
