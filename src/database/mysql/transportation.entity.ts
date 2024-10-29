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
import { DeliveryStatus } from "@common"


@ObjectType()
@Entity("transportation")
export class TransportationEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        transportationId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 200 })
        pickUpAddress: string

    @Field(() => String)
    @Column({ type: "varchar", length: 200 })
        dropOffAddress: string

    @Field(() => String)
    @Column({ type: "enum", enum: DeliveryStatus })
        deliveryStatus: DeliveryStatus

    @Field(() => String, { nullable: true })
    @Column({ type: "varchar", length: 2000, nullable: true })
        notes: string

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => OrderFishEntity, { nullable: true })
    @OneToMany(() => OrderFishEntity, (fishes) => fishes.order, { nullable: true })
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
