import { Field, Float, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class InitReportOutput {
    @Field(() => Int)
        numberOfOrders: number
    @Field(() => Int)
        numberOfDrivers: number
    @Field(() => Int)
        numberOfTransportServices: number
    @Field(() => Float)
        averageOrderRating: number
    @Field(() => Float)
        totalRevenue: number
}