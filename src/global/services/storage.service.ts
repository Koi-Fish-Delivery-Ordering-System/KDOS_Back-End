import { pathsConfig } from "@config"
import { dirname, join } from "path"
import { FilesData, isMinimalFile, Metadata } from "src/common/types/files.type"
import {
    promises as fsPromises,
} from "fs"
import {v4 as uuid4} from "uuid"
import { makeDirectoryIfNotExisted } from "src/common/utils/base.utils"
import { Injectable, NotFoundException } from "@nestjs/common"

const METADATA_FILE_NAME = "metadata.json"

@Injectable()
export class StorageService {
    constructor() {}

    private async readFile(paths: string[], options?: BufferEncoding) {
        return await fsPromises.readFile(
            join(pathsConfig().storageDirectory, ...paths),
            options,
        )
    }

    private async writeFile(paths: string[], data: string | Buffer) {
        const filePath = join(pathsConfig().storageDirectory, ...paths)
        await makeDirectoryIfNotExisted(dirname(filePath))
        await fsPromises.writeFile(filePath, data)
    }

    public async upload(input : FilesData) : Promise<Metadata> {
        const { rootFile } = input
        const assetId = uuid4()

        const _isMinimalFile = isMinimalFile(rootFile)
        const filename = _isMinimalFile ? rootFile.filename : rootFile.originalname
        const fileBody = _isMinimalFile ? rootFile.fileBody : rootFile.buffer
        await this.writeFile([assetId, filename], fileBody)

        const metadata: Metadata = {
            assetId,
            filename,
        }

        await this.uploadMetadata(metadata)
        return metadata
    }

    public async delete(...assetIds: Array<string>) {
        for (const assetId of assetIds){
            await fsPromises.rm(join(pathsConfig().storageDirectory, assetId), {
                force: true,
                recursive: true,
            })
        }
    }

    private async uploadMetadata(metadata: Metadata) {
        const { assetId } = metadata
        await this.writeFile(
            [assetId, METADATA_FILE_NAME],
            JSON.stringify(metadata),
        )
    }

    public async getFilenameFromAssetId(assetId: string): Promise<string> {
        const data = await this.readFile([assetId, "metadata.json"], "utf8")
        if(!data){
            throw new NotFoundException("File not found or has been deleted")
        }
        const { filename } = JSON.parse(data) as Metadata
        return filename
    }
}