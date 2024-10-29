import { Field, Float, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { OrderAdditionalServiceEntity } from "./order_additional_service.entity"
import { TransportType } from "@common"

@ObjectType()
@Entity("additionalService")
export class AdditionalServiceEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        additionalServiceId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        name: string
    
    @Field(() => String)
    @Column({ type: "varchar", length: 1000 })
        description: string

    @Field(() => Float)
    @Column({ type: "float", default: 1 })
        price: number

    @Field(() => String, {nullable: true})
    @Column({ type: "enum", enum: TransportType, nullable: true})
        forTransportType: TransportType

    @Field(() => Boolean)
    @Column({ type: "boolean", default: true })
        isActive : boolean

    @Field(() => String)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => OrderAdditionalServiceEntity)
    @OneToMany(() => OrderAdditionalServiceEntity, (orderAdditionalService) => orderAdditionalService.additionalService, {})
        orders : Array<OrderAdditionalServiceEntity>
}


