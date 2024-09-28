import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"

@ObjectType()
@Entity("pricePlan")
export class PricePlanEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        pricePlanId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        name: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        volume: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        quantity: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        price: string

    @Field(() => String)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
        updatedAt: Date
}
