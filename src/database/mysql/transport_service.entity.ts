import { Field, Float, ID, ObjectType } from "@nestjs/graphql"
import { TransportType } from "@common"
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { OrderEntity } from "./order.entity"

@ObjectType()
@Entity("transport_service")
export class TransportServiceEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        transportServiceId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        name: string

    @Field(() => String)
    @Column({ type: "varchar", length: 200 })
        description: string

    @Field(() => String)
    @Column({ type: "enum", enum: TransportType })
        type: TransportType

    @Field(() => Float)
    @Column({ type: "float", default: 1 })
        pricePerKm: number

    @Field(() => Float)
    @Column({ type: "float", default: 1 })
        pricePerKg: number

    @Field(() => Float)
    @Column({ type: "float", default: 1 })
        pricePerAmount: number

    @Field(() => Boolean)
    @Column({ type: "boolean", default: false })
        isDisabled : boolean

    @Field(() => String)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => OrderEntity)
    @OneToMany(() => OrderEntity, (order) => order.transportService)
        orders: Array<OrderEntity>

}



