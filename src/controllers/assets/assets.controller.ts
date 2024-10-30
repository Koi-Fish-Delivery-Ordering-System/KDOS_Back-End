import { pathsConfig } from "@config"
import { StorageService } from "@global"
import { Controller, Get, Param, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { Response } from "express"
import * as path from "path"

@ApiTags("Assets")
@Controller("api/assets")
export class AssetsController {
    constructor(
        private readonly storageService : StorageService
    ) { }

    @Get("get-image/:assetId")
    async getImagebyAssetId(
        @Param("assetId") assetId : string,
        @Res() response : Response
    ){
        const filename = await this.storageService.getFilenameFromAssetId(assetId)
        const url = path.join(pathsConfig().storageDirectory, assetId, filename)

        return response.sendFile(url)
    }

}