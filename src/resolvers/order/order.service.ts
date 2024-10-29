import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { OrderMySqlEntity } from "@database"
import { FindManyUserOrderInput, FindOneUserOrderInput } from "./order.input"
import { OrderStatus } from "@common"

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderMySqlEntity)
        private readonly orderMySqlRepository: Repository<OrderMySqlEntity>
    ) { }

    async findManyUserOrder (input : FindManyUserOrderInput) : Promise<Array<OrderMySqlEntity>> {
        const { accountId } = input
        
        const results = await this.orderMySqlRepository.find({
            where:{
                accountId
            },
            order:{
                createdAt: "DESC"
            }
        })

        return results
    }
    
    async findOneUserOrder (input : FindOneUserOrderInput) : Promise<OrderMySqlEntity> {
        const { accountId, data } = input
        const { params} = data
        const { orderId } = params

        const result = await this.orderMySqlRepository.findOne({
            where:{
                orderId,
                accountId
            }
        })

        return result
    }

    async findManyPendingOrder() : Promise<Array<OrderMySqlEntity>>{
        const results = await this.orderMySqlRepository.find({
            where:{
                orderStatus: OrderStatus.Pending
            }
        })

        return results
    }
}