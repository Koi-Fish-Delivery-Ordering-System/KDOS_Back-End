import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { CancelOrderInput, ChangePaymentMethodInput, CreateOrderFeedBackInput, CreateOrderInput, UpdateOrderInput } from "./order.input"
import { CancelOrderOutput, ChangePaymentMethodOutput, CreateOrderFeedBackOutput, CreateOrderOutput, UpdateOrderOutput } from "./order.output"
import { InjectRepository } from "@nestjs/typeorm"
import { DeepPartial, Repository } from "typeorm"
import { AccountMySqlEntity, FishQualificationMySqlEntity, OrderFishMySqlEntity, OrderMySqlEntity, TransactionMySqlEntity } from "@database"
import { VnpayService } from "@global"
import { OrderStatus, PaymentMethod, TransactionStatus, TransactionType } from "@common"

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(TransactionMySqlEntity)
        private readonly transactionMySqlRepository: Repository<TransactionMySqlEntity>,
        @InjectRepository(AccountMySqlEntity)
        private readonly accountMySqlRepository: Repository<AccountMySqlEntity>,
        @InjectRepository(OrderMySqlEntity)
        private readonly orderMySqlRepository: Repository<OrderMySqlEntity>,
        @InjectRepository(OrderFishMySqlEntity)
        private readonly orderFishMySqlRepository: Repository<OrderFishMySqlEntity>,
        @InjectRepository(FishQualificationMySqlEntity)
        private readonly fishQualificationMySqlRepository: Repository<FishQualificationMySqlEntity>,
        private readonly vnpayService: VnpayService
    ) { }

    async createOrder(input: CreateOrderInput): Promise<CreateOrderOutput> {
        const { data, accountId } = input
        const {
            fromAddress,
            toAddress,
            fromProvince,
            toProvince,
            totalPrice,
            transportServiceId,
            receiverName,
            receiverPhone,
            notes,
            paymentMethod,
            additionalServiceIds,
            fishes,
        } = data

        const createdOrder = await this.orderMySqlRepository.save({
            fromAddress,
            toAddress,
            fromProvince,
            toProvince,
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
                qualifications,
                fishImageUrl
            } = fish

            const addFish: DeepPartial<OrderFishMySqlEntity> = {
                orderId: createdOrder.orderId,
                name,
                gender,
                species,
                ageInMonth,
                description,
                length,
                weight,
                fishImageUrl
            }
            const { orderFishId } = await this.orderFishMySqlRepository.save(addFish)

            if (qualifications) {
                const promises: Array<Promise<void>> = []
                for (const imageUrl of qualifications) {
                    const promise = async () => {
                        await this.fishQualificationMySqlRepository.save({
                            fishId: orderFishId,
                            imageUrl
                        })
                    }
                    promises.push(promise())
                }

                await Promise.all(promises)
            }
        }

        if (paymentMethod === PaymentMethod.Vnpay) {
            const { transactionId } = await this.transactionMySqlRepository.save({
                accountId,
                orderId: createdOrder.orderId,
                amount: createdOrder.totalPrice,
                type: TransactionType.Pay
            })
            const paymentUrl = this.vnpayService.createPaymentUrl(transactionId, totalPrice)
            console.log(paymentUrl)
            return {
                message: "Order has been created successfully",
                others: {
                    paymentUrl
                }
            }
        } else if (paymentMethod === PaymentMethod.Wallet) {
            const { walletAmount } = await this.accountMySqlRepository.findOne({
                where: {
                    accountId
                }
            })

            if (walletAmount >= createdOrder.totalPrice) {
                await this.accountMySqlRepository.update(accountId, { walletAmount: walletAmount - createdOrder.totalPrice })
                await this.orderMySqlRepository.update({ orderId: createdOrder.orderId }, { orderStatus: OrderStatus.Processing })
                await this.transactionMySqlRepository.save({
                    accountId,
                    amount: createdOrder.totalPrice,
                    type: TransactionType.UseWallet,
                    orderId: createdOrder.orderId,
                    status: TransactionStatus.Success
                })
            }

        } else if (paymentMethod === PaymentMethod.Cash) {
            await this.orderMySqlRepository.update({ orderId: createdOrder.orderId }, { orderStatus: OrderStatus.Processing })
        }

        return {
            message: "Order has been created successfully",
        }

    }

    async updateOrder(input: UpdateOrderInput): Promise<UpdateOrderOutput> {
        const { data } = input
        const { orderId, totalPrice, notes, selectedAdditionalService } = data

        const order: DeepPartial<OrderMySqlEntity> = {
            orderId,
            totalPrice,
            selectedAdditionalService: [],
            notes
        }

        if (selectedAdditionalService && selectedAdditionalService.length > 0) {
            order.selectedAdditionalService = selectedAdditionalService.map((additionalSerivceId) => ({
                additionalSerivceId,
                orderId
            }))
        }

        await this.orderMySqlRepository.update(orderId, order)

        return {
            message: "Order has been updated successfully"
        }
    }

    async createOrderFeedBack(input: CreateOrderFeedBackInput): Promise<CreateOrderFeedBackOutput> {
        const { data } = input
        const { orderId, feedBackStars, feedBackContent } = data

        const found = await this.orderMySqlRepository.findOne({
            where: {
                orderId
            }
        })

        if (!found) {
            throw new ConflictException("Order not found.")
        }

        if (found.orderStatus !== OrderStatus.Completed) {
            throw new ConflictException("You can only feedback this order when it is delivered")
        }

        await this.orderMySqlRepository.update(orderId, { feedBackStars, feedBackContent })

        return {
            message: "FeedBack for order created successfully"
        }
    }

    async cancelOrder(input: CancelOrderInput): Promise<CancelOrderOutput> {
        const { accountId, data } = input
        const { orderId, reasonToCancel } = data

        const order = await this.orderMySqlRepository.findOne({
            where: {
                orderId
            }
        })

        if (!order) {
            throw new NotFoundException(" Order not found. ")
        }

        if (order.orderStatus === OrderStatus.UnCompleted || order.orderStatus === OrderStatus.Processing) {
            if (order.orderStatus !== OrderStatus.UnCompleted) {
                await this.accountMySqlRepository.increment({ accountId }, "walletAmount", order.totalPrice)
                await this.transactionMySqlRepository.save({
                    accountId,
                    amount: order.totalPrice,
                    type: TransactionType.Refund,
                    status: TransactionStatus.Success,
                    orderId
                })
            }
        } else {
            throw new ConflictException("You can only cancel the order while it is uncompleted or processing.")
        }

        await this.orderMySqlRepository.update(orderId, { orderStatus: OrderStatus.Canceled, reasonToCancel })

        return {
            message: "Order canceled successfully"
        }
    }

    async changePaymentMethod(input: ChangePaymentMethodInput): Promise<ChangePaymentMethodOutput> {
        const { accountId, data } = input
        const { orderId, paymentMethod } = data

        const order = await this.orderMySqlRepository.findOne({
            where: {
                orderId
            }
        })

        if (!order) {
            throw new NotFoundException("Order not found.")
        }

        if (order.orderStatus !== OrderStatus.UnCompleted) {
            throw new ConflictException(" YOu can only change payment method of order since it has not been processing. ")
        }

        if (paymentMethod === PaymentMethod.Wallet) {
            const { walletAmount } = await this.accountMySqlRepository.findOne({
                where: {
                    accountId
                }
            })
            console.log(walletAmount)
            if (walletAmount < order.totalPrice) {
                throw new ConflictException(" Your account balance is not enough to complete this order. ")
            }

            await this.accountMySqlRepository.update(accountId, { walletAmount: walletAmount - order.totalPrice })
            await this.orderMySqlRepository.update(orderId, { orderStatus: OrderStatus.Processing })
        }

        await this.orderMySqlRepository.update(orderId, { paymentMethod })

        if (paymentMethod !== PaymentMethod.Vnpay) {
            await this.orderMySqlRepository.update(orderId, { orderStatus: OrderStatus.Processing })
        }

        return {
            message: "Payment method changed successfully"
        }
    }
}