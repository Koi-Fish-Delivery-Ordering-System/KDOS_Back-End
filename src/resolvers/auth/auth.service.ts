import { AccountMySqlEntity, OrderMySqlEntity, TransportServiceMySqlEntity } from "@database"
import { Sha256Service } from "@global"
import {
    Injectable
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Not, Repository } from "typeorm"
import {
    InitInput
} from "./auth.input"
import { InitReportOutput } from "./auth.output"

@Injectable()
export class AuthService {
    constructor(
        private readonly sha256Service: Sha256Service,
        @InjectRepository(AccountMySqlEntity)
        private readonly accountMySqlRepository: Repository<AccountMySqlEntity>,
        @InjectRepository(OrderMySqlEntity)
        private readonly orderMySqlRepository: Repository<OrderMySqlEntity>,
        @InjectRepository(TransportServiceMySqlEntity)
        private readonly transportServiceMySqlRepository: Repository<TransportServiceMySqlEntity>,

    ) { }

    async init(input: InitInput): Promise<AccountMySqlEntity> {
        const account = await this.accountMySqlRepository.findOne({
            where: {
                accountId: input.accountId,
            },
        })

        return account
    }

    async initReport(): Promise<InitReportOutput> {
        const totalOrders = await this.orderMySqlRepository.find() 
        const numberOfOrders = totalOrders.length
        const numberOfDrivers = await this.accountMySqlRepository.count({
            where: {
                driverId: Not("")
            }
        })
        const numberOfTransportServices = await this.transportServiceMySqlRepository.count({
            where: {
                isActive: true
            }
        })

        let averageOrderRating = 0

        const ordersWithRating = await this.orderMySqlRepository.find({
            where: {
                feedBackStars: Not(0)
            }
        })

        if (ordersWithRating.length > 0) {
            const totalStar = ordersWithRating.reduce((total, order) => {
                return total + order.feedBackStars
            }, 0)

            // Tính trung bình
            averageOrderRating = totalStar / ordersWithRating.length
        }

        const totalRevenue = totalOrders.reduce((total, order) => {
            return total + order.totalPrice
        }, 0)

        return {
            numberOfOrders,
            numberOfDrivers,
            numberOfTransportServices,
            averageOrderRating,
            totalRevenue
        }
    }

}
