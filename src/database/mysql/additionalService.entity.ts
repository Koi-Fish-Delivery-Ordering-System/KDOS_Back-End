import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { OrderAdditionalServiceEntity } from "./order_additional_service.entity"

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
    @Column({ type: "float", default: 1 })
        price: string

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


