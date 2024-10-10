import { Injectable } from "@nestjs/common"
import { CreateOrderInput } from "./order.input"

@Injectable()
export class OrderService {
    constructor(

    ) { }

    async createOrder(input: CreateOrderInput) : Promise<void> {
        
    }
}