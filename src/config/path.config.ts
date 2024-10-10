import { join } from "path"

export const pathsConfig = () => ({
    storageDirectory: join(process.cwd(), "storage")
})