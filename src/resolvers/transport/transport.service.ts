import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { AdditionalServiceMySqlEntity, RouteMySqlEntity, TransportServiceMySqlEntity } from "@database"
import { Repository } from "typeorm"
import { FindAllTransportServiceInput, FindManyStatusRouteInput, FindManySuitableAdditionalServiceInput, FindManySuitableTransportServiceInput } from "./transport.input"
import { checkFlightRoute } from "src/common/utils/base.utils"
import { TransportType } from "@common"

@Injectable()
export class TransportService {
    constructor(
        @InjectRepository(TransportServiceMySqlEntity)
        private readonly transportMySqlRepository : Repository<TransportServiceMySqlEntity>,
        @InjectRepository(AdditionalServiceMySqlEntity)
        private readonly additionalServiceMySqlRepository : Repository<AdditionalServiceMySqlEntity>,
        @InjectRepository(RouteMySqlEntity)
        private readonly routeMySqlRepository : Repository<RouteMySqlEntity>
    ) {}

    async findManySuitableTransportService(input: FindManySuitableTransportServiceInput): Promise<Array<TransportServiceMySqlEntity>> {
        const { data } = input
        const { fromProvince, toProvince } = data
    
        let results = await this.transportMySqlRepository.find()
        console.log(fromProvince, toProvince ,checkFlightRoute(fromProvince, toProvince))
        if (!checkFlightRoute(fromProvince, toProvince)) {
            results = results.filter(service => service.type !== TransportType.Air)
        }
    
        return results
    }

    async findAllTransportService (input: FindAllTransportServiceInput) : Promise<Array<TransportServiceMySqlEntity>>{
        const { data } = input
        const { options } = data
        const { skip, take } = options

        const results = await this.transportMySqlRepository.find({
            skip,
            take
        })

        return results
    }

    async findManySuitableAdditionalService (input: FindManySuitableAdditionalServiceInput) : Promise<Array<AdditionalServiceMySqlEntity>>{
        const { data } = input
        const { transportType } = data
    
        const results = await this.additionalServiceMySqlRepository.find({
            where: [
                {
                    forTransportType: transportType,
                    isActive: true
                },
                {
                    forTransportType: null,
                    isActive: true
                }
            ]
        })
    
        return results
    }

    async findManyStatusRoute(input: FindManyStatusRouteInput) : Promise<Array<RouteMySqlEntity>>{
        const { data } = input
        const { options } = data
        const { status } = options

        const results = await this.routeMySqlRepository.find({
            where:{
                status
            },
            relations:{
                driver: true,
                routeStops:{
                    
                }
            },
            order:{
                createdAt: "DESC"
            }
        })

        return results
    }
}