import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { OrderEntity } from "./order.entity"
import { AdditionalServiceEntity } from "./additionalService.entity"


@ObjectType()
@Entity("order_additional_service")
export class OrderAdditionalServiceEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        orderAdditionalServiceId: string

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => ID)
    @Column({ type: "uuid", length: 36 })
        orderId: string

    @Field(() => ID)
    @Column({ type: "uuid", length: 36 })
        additionalServiceId: string

    @Field(() => OrderEntity, { nullable: true })
    @ManyToOne(
        () => OrderEntity,
        (order) => order.selectedAdditionalService,
        { onDelete: "CASCADE", }
    )
    @JoinColumn({ name: "orderId" })
        order: OrderEntity

    @Field(() => AdditionalServiceEntity, { nullable: true })
    @ManyToOne(
        () => AdditionalServiceEntity,
        (additionalService) => additionalService.orders,
        { onDelete: "CASCADE" },
    )
    @JoinColumn({ name: "additionalServiceId" })
        additionalService: AdditionalServiceEntity
}
