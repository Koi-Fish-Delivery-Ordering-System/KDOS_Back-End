import { AccountMySqlEntity } from "@database"
import { Sha256Service } from "@global"
import {
    Injectable
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import {
    InitInput
} from "./auth.input"

@Injectable()
export class AuthService {
    constructor(
        private readonly sha256Service: Sha256Service,
        @InjectRepository(AccountMySqlEntity)
        private readonly accountMySqlRepository: Repository<AccountMySqlEntity>,

    ) { }

    async init(input: InitInput): Promise<AccountMySqlEntity> {
        const account = await this.accountMySqlRepository.findOne({
            where: {
                accountId: input.accountId,
            },
            relations: {
                roles: true
            }
        })

        return account
    }
    
}
