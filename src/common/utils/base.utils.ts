import {
    existsSync,
    promises as fsPromises
} from "fs"

export const makeDirectoryIfNotExisted = async (directory: string) => {
    if (!existsSync(directory)) {
        await fsPromises.mkdir(directory, { recursive: true })
    }
}