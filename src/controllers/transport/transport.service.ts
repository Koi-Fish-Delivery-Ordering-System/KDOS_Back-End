import { Injectable } from "@nestjs/common"
import { CreateTransportServiceInput, UpdateTransportServiceInput } from "./transport.input"
import { TransportServiceMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateTransportOutput } from "./transport.output"


@Injectable()
export class TransportService {
    constructor(
        @InjectRepository(TransportServiceMySqlEntity)
        private readonly transportServiceMySqlRepository: Repository<TransportServiceMySqlEntity>,
    ) { }

    async createTransportService(input: CreateTransportServiceInput): Promise<CreateTransportOutput> {
        const { name, type, description, pricePerAmount, pricePerKg, pricePerKm } = input

        const transport : Partial<TransportServiceMySqlEntity> = {
            name,
            type,
            description,
            pricePerAmount,
            pricePerKg,
            pricePerKm
        }

        await this.transportServiceMySqlRepository.save(transport)

        return {
            message: "Transport Service has been created successfully"
        }

    }

    async updateTransportService(input: UpdateTransportServiceInput) : Promise<void> {
        const { transportServiceId, name, type, description, pricePerAmount, pricePerKg, pricePerKm } = input

        const transport : Partial<TransportServiceMySqlEntity> = {
            name,
            type,
            description,
            pricePerAmount,
            pricePerKg,
            pricePerKm
        }

        await this.transportServiceMySqlRepository.update(transportServiceId, transport)
    }

    
}