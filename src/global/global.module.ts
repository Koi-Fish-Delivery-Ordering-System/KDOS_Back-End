import { Global, Module } from "@nestjs/common"
import {
    Sha256Service,
    StorageService} from "./services"


@Global()
@Module({
    imports: [
        // TypeOrmModule.forFeature([
        //     AccountMySqlEntity,
        // ])
    ],
    exports: [
        Sha256Service,
        StorageService
    ],
    providers: [
        Sha256Service,
        StorageService
    ], 
})
export class GlobalModule { }
