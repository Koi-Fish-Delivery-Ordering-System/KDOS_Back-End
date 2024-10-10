import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import { OrderFishEntity } from "./order_fish.entity"
import { AccountEntity } from "./account.entity"
import { TransportServiceEntity } from "./transport_service.entity"
import { OrderAdditionalServiceEntity } from "./order_additional_service.entity"


@ObjectType()
@Entity("order")
export class OrderEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        orderId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        recipientName: string

    @Field(() => String)
    @Column({ type: "varchar", length: 200 })
        fromAddress: string

    @Field(() => String)
    @Column({ type: "varchar", length: 200 })
        toAddress: string

    @Field(() => String)
    @Column({ type: "varchar", length: 12 })
        reciverName: string

    @Field(() => String)
    @Column({ type: "varchar", length: 12 })
        reciverPhone: string

    @Field(() => ID)
    @Column({ type: "uuid", length: 36 })
        accountId: string

    @Field(() => ID)
    @Column({ type: "uuid", length: 36 })
        transportServiceId: string

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => OrderFishEntity)
    @OneToMany(() => OrderFishEntity, (fishes) => fishes.order)
        orderedFish: OrderFishEntity

    @Field(() => AccountEntity)
    @ManyToOne(() => AccountEntity, (account) => account.orders)
    @JoinColumn({ name: "accountId" })
        account: AccountEntity

    @Field(() => TransportServiceEntity)
    @ManyToOne(() => TransportServiceEntity, (service) => service.orders)
    @JoinColumn({ name: "transportServiceId" })
        transportService: TransportServiceEntity

    @Field(() => [OrderAdditionalServiceEntity], { nullable: true })
    @OneToMany(
        () => OrderAdditionalServiceEntity,
        (orderAdditionalService) => orderAdditionalService.order,
        { cascade: true }
    )
        selectedAdditionalService: Array<OrderAdditionalServiceEntity>

}
