import { VnpayService } from "@global"
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { AccountMySqlEntity, OrderMySqlEntity, TransactionMySqlEntity } from "src/database"
import { Repository } from "typeorm"
import * as querystring from "querystring"
import { CreateTransactionInput, UpdateTransactionInput } from "./transaction.input"
import { CreateTransactionOutput, UpdateTransactionOutput } from "./transaction.output"
import { OrderStatus, TransactionStatus, TransactionType } from "@common"
import { vnpayConfig } from "@config"

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(AccountMySqlEntity)
        private readonly accountMySqlRepository: Repository<AccountMySqlEntity>,
        @InjectRepository(TransactionMySqlEntity)
        private readonly transactionMySqlRepository: Repository<TransactionMySqlEntity>,
        @InjectRepository(OrderMySqlEntity)
        private readonly orderMySqlRepository: Repository<OrderMySqlEntity>,
        private readonly vnpayService: VnpayService

    ) { }

    async createTransaction(input: CreateTransactionInput): Promise<CreateTransactionOutput> {
        const { accountId, data } = input
        const { type } = data

        let transaction = ""
        let amountOrder = 0

        switch (type) {
        case TransactionType.Pay: {
            const { orderId } = data
            const order = await this.orderMySqlRepository.findOne({
                where: {
                    orderId
                }
            })
    
            if (!order) {
                throw new NotFoundException("Order not found.")
            }
    
            if (order.orderStatus !== OrderStatus.UnCompleted) {
                throw new ConflictException("Order has already paid.")
            }

            const { transactionId } = await this.transactionMySqlRepository.save({ 
                accountId,
                type: TransactionType.Pay,
                amount : order.totalPrice,
                orderId
            })

            transaction = transactionId
            amountOrder = order.totalPrice
            break
        }
        
        case TransactionType.TopUp: {
            const { amount } = data
            const { transactionId } = await this.transactionMySqlRepository.save({
                accountId, 
                type: TransactionType.TopUp,
                amount
            })
            
            transaction = transactionId
            amountOrder = amount

            break
        }
        }

        const paymentUrl = this.vnpayService.createPaymentUrl(transaction, amountOrder)
        console.log(paymentUrl)
        return {
            message: "Transaction created successfully.",
            others: {
                paymentUrl
            }
        }
    }

    async updateTransaction(input: UpdateTransactionInput): Promise<UpdateTransactionOutput> {
        const { data } = input
        const { transactionId, vnp_ResponseCode } = data

        const transaction = await this.transactionMySqlRepository.findOne({
            where: {
                transactionId
            },
            relations: {
                account: true
            }
        })

        if (!transaction) {
            throw new NotFoundException("Transaction Not Found")
        }

        if (transaction.status !== TransactionStatus.NotCompleted) {
            throw new ConflictException("Transaction has been completed")
        }

        let transactionStatus = TransactionStatus.Failed

        if (vnp_ResponseCode === "00") {
            switch (transaction.type) {
            case TransactionType.Pay: {
                await this.orderMySqlRepository.update({ orderId: transaction.orderId }, { orderStatus: OrderStatus.Processing })
                break
            }
            case TransactionType.TopUp: {
                await this.accountMySqlRepository.increment({accountId : transaction.accountId}, "walletAmount", transaction.amount)
                break
            }
            }

            transactionStatus = TransactionStatus.Success
        }

        await this.transactionMySqlRepository.update(transactionId, { status: transactionStatus })

        return {
            message: "Transation updated successfully"
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleVnpayResult(queryParams: any): boolean {
        // Lấy tất cả các tham số trả về từ VNPay
        const vnpParams = { ...queryParams }
        const secureHash = vnpParams["vnp_SecureHash"]

        // Xóa tham số secureHash khỏi đối tượng để tạo chữ ký
        delete vnpParams["vnp_SecureHash"]

        // Sắp xếp các tham số và tạo chuỗi query để tính toán lại chữ ký
        const sortedParams = this.vnpayService.sortObject(vnpParams)
        const signData = querystring.stringify(sortedParams)

        // Tính toán lại chữ ký HMAC SHA-512 từ khóa bí mật và chuỗi signData
        const calculatedHash = this.vnpayService.createHmacSHA512(vnpayConfig().hashSecret, signData)

        // Kiểm tra chữ ký trả về có hợp lệ không
        if (calculatedHash === secureHash) {
            // Nếu chữ ký hợp lệ, kiểm tra kết quả thanh toán
            if (vnpParams["vnp_ResponseCode"] === "00") {
                return true
            } else {
                return false
            }
        }
    }
}


