import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TransactionMySqlEntity } from "@database"
import { Not, Repository } from "typeorm"
import { FindManyTransactionInput } from "./transaction.input"
import { TransactionStatus } from "@common"


@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(TransactionMySqlEntity)
        private readonly transportMySqlRepository: Repository<TransactionMySqlEntity>,

    ) { }

    async findManyTransaction(input: FindManyTransactionInput): Promise<Array<TransactionMySqlEntity>> {
        const { accountId } = input

        const results = await this.transportMySqlRepository.find({
            where: {
                accountId,
                status: Not(TransactionStatus.NotCompleted)
            },
            relations:{
                order: true,
                account: true
            },
            order: {
                createdAt: "DESC"
            }
        })

        return results
    }

}