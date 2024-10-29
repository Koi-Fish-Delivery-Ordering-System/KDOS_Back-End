import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateAdditionalServiceInput, CreateTransportationInput, CreateTransportServiceInput, ToggleAdditionalServiceInput, ToggleTransportServiceInput, UpdateAdditionalServiceInput, UpdateTransportServiceInput } from "./transport.input"
import { AdditionalServiceMySqlEntity, TransportServiceMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateAdditionalServiceOutput, CreateTransportationOutput, CreateTransportOutput, ToggleAdditionalServiceOutput, ToggleTransportServiceOutput, UpdateAdditionalServiceOutput, UpdateTransportServiceOutput } from "./transport.output"


@Injectable()
export class TransportService {
    constructor(
        @InjectRepository(TransportServiceMySqlEntity)
        private readonly transportServiceMySqlRepository: Repository<TransportServiceMySqlEntity>,
        @InjectRepository(AdditionalServiceMySqlEntity)
        private readonly additionalServiceMySqlRepository: Repository<AdditionalServiceMySqlEntity>,
    ) { }

    async createTransportService(input: CreateTransportServiceInput): Promise<CreateTransportOutput> {
        const { data } = input
        const { name, type, description, pricePerKg, pricePerKm } = data

        const transport: Partial<TransportServiceMySqlEntity> = {
            name,
            type,
            description,
            pricePerKg,
            pricePerKm
        }

        await this.transportServiceMySqlRepository.save(transport)

        return {
            message: "Transport Service has been created successfully"
        }

    }

    async updateTransportService(input: UpdateTransportServiceInput): Promise<UpdateTransportServiceOutput> {
        const { data } = input
        const { transportServiceId, name, type, description, pricePerKg, pricePerKm } = data

        const transport: Partial<TransportServiceMySqlEntity> = {
            name,
            type,
            description,
            pricePerKg,
            pricePerKm
        }

        await this.transportServiceMySqlRepository.update(transportServiceId, transport)

        return {
            message: "Transport Service has been updated successfully."
        }
    }

    async toggleTransportService(input: ToggleTransportServiceInput): Promise<ToggleTransportServiceOutput> {
        const { data } = input
        const { params } = data
        const { transportServiceId } = params

        const found = await this.transportServiceMySqlRepository.findOneBy({ transportServiceId })

        if (!found) {
            throw new NotFoundException("Transport service not found")
        }

        await this.additionalServiceMySqlRepository.update(transportServiceId, { isActive: !found.isActive })

        return {
            message: `This additional service is ${found.isActive ? "activated" : "disabled"}`
        }
    }

    async createTransportation(input: CreateTransportationInput): Promise<CreateTransportationOutput> {
        const { data } = input

        return {
            message: "New Transportation has been created successfully"
        }
    }

    async createAdditionalService(input: CreateAdditionalServiceInput): Promise<CreateAdditionalServiceOutput> {
        const { data } = input
        const { name, description, forTransportType, price } = data

        await this.additionalServiceMySqlRepository.save({
            name,
            description,
            forTransportType,
            price
        })

        return {
            message: "New additional service has been created successfully"
        }
    }

    async updateAdditionalService(input: UpdateAdditionalServiceInput): Promise<UpdateAdditionalServiceOutput> {
        const { data } = input
        const { additionalServiceId, name, description, forTransportType, price } = data

        const addserv: Partial<AdditionalServiceMySqlEntity> = {
            name,
            description,
            forTransportType,
            price
        }

        await this.additionalServiceMySqlRepository.update(additionalServiceId, addserv)

        return {
            message: "New additional service has been created successfully"
        }
    }

    async toggleAdditionalService(input: ToggleAdditionalServiceInput): Promise<ToggleAdditionalServiceOutput> {
        const { data } = input
        const { params } = data
        const { additionalServiceId } = params

        const found = await this.additionalServiceMySqlRepository.findOneBy({ additionalServiceId })

        if (!found) {
            throw new NotFoundException("Additional service not found")
        }

        await this.additionalServiceMySqlRepository.update(additionalServiceId, { isActive: !found.isActive })

        return {
            message: `This additional service is ${found.isActive ? "activated" : "disabled"}`
        }
    }
}