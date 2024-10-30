
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AssetsController } from "./assets.controller"

@Module({
    imports: [
        TypeOrmModule.forFeature([

        ]),
    ],
    controllers: [AssetsController],
    providers: [],
})
export class AssetsModule {}
