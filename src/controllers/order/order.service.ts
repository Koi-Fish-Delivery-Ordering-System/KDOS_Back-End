import { Injectable } from "@nestjs/common"
import { CreateOrderInput, UpdateOrderInput } from "./order.input"
import { CreateOrderOutput, UpdateOrderOutput } from "./order.output"
import { InjectRepository } from "@nestjs/typeorm"
import { DeepPartial, Repository } from "typeorm"
import { FishQualificationMySqlEntity, OrderFishMySqlEntity, OrderMySqlEntity } from "@database"
import { StorageService } from "@global"

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderMySqlEntity)
        private readonly orderMySqlRepository: Repository<OrderMySqlEntity>,
        @InjectRepository(OrderFishMySqlEntity)
        private readonly orderFishMySqlRepository: Repository<OrderFishMySqlEntity>,
        @InjectRepository(FishQualificationMySqlEntity)
        private readonly fishQualificationMySqlRepository: Repository<FishQualificationMySqlEntity>,
        private readonly storageService : StorageService
    ) { }

    async createOrder(input: CreateOrderInput): Promise<CreateOrderOutput> {
        const { data, accountId, files } = input
        const { 
            fromAddress, 
            toAddress, 
            totalPrice, 
            transportServiceId,
            receiverName,
            receiverPhone,
            notes,
            paymentMethod,
            additionalServiceIds,
            fishes 
        } = data

        const { orderId } = await this.orderMySqlRepository.save({
            fromAddress,
            toAddress,
            accountId,
            totalPrice,
            transportServiceId,
            notes,
            receiverName,
            receiverPhone,
            paymentMethod,
            selectedAdditionalService: additionalServiceIds
                ? additionalServiceIds.map((additionalServiceId) => ({
                    additionalServiceId,
                }))
                : [],
        })

        for (const fish of fishes) {
            const {
                name,
                gender,
                species,
                ageInMonth,
                description,
                length,
                weight,
                qualifications
            } = fish

            const addFish : DeepPartial<OrderFishMySqlEntity> = {
                orderId,
                name,
                gender,
                species,
                ageInMonth,
                description,
                length,
                weight
            }
            const { orderFishId } = await this.orderFishMySqlRepository.save(addFish)

            if(files) {
                const promises: Array<Promise<void>> = []
                for (const { mediaIndex } of qualifications) {
                    const promise = async () => {
                        const file = files.at(mediaIndex)
                        const { assetId } = await this.storageService.upload({
                            rootFile: file,
                        })
                        await this.fishQualificationMySqlRepository.save({
                            fishId: orderFishId,
                            fileId: assetId
                        })
                    }
                    promises.push(promise())
                }

                await Promise.all(promises)
            }

        }

        return {
            message: "Order has been created successfully"
        }

    }

    async updateOrder(input: UpdateOrderInput): Promise<UpdateOrderOutput> {
        const { data } = input
        const { orderId, totalPrice, notes, selectedAdditionalService } = data

        const order : DeepPartial<OrderMySqlEntity> = {
            orderId,
            totalPrice,
            selectedAdditionalService : [],
            notes
        }

        if(selectedAdditionalService && selectedAdditionalService.length > 0) {
            order.selectedAdditionalService = selectedAdditionalService.map((additionalSerivceId) => ({
                additionalSerivceId,
                orderId
            }))
        }

        await this.orderMySqlRepository.update(orderId, order)
        
        return {
            message : "Order has been updated successfully"
        }
    }
}