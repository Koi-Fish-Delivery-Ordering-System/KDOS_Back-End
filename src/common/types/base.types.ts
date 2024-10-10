import { AuthTokens } from "./auth.types"

export interface AuthOutput<T> {
    data?: T,
    tokens?: AuthTokens
}

export interface AuthInput<T> {
    accountId: string,
    data: T,
    files?: Array<Express.Multer.File>
}

export interface Input<T> {
    data: T,
    files?: Array<Express.Multer.File>
}

export interface Output<T = undefined> {
    message: string,
    others?: T
}

export interface AuthEmptyDataInput {
    accountId: string,
    files?: Array<Express.Multer.File>
}

export interface ParamsWithOptions<T, K> {
    params: T,
    options?: K
}

export interface ParamsOnly<T> {
    params: T
}

export interface OptionsOnly<T> {
    options?: T
}

export interface ResultsWithMetadata<T, K> {
    results: Array<T>,
    metadata?: K
}
