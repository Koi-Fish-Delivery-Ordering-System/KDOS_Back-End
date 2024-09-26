import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { AccountMySqlEntity } from "src/database"
import { Repository } from "typeorm"

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(AccountMySqlEntity)
        private readonly accountMySqlRepository: Repository<AccountMySqlEntity>,
    ) { }
}