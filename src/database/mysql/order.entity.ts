import { Field, Float, ID, ObjectType } from "@nestjs/graphql"
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
import { OrderStatus, PaymentMethod, ServicePricingType } from "@common"
import { RouteStopMySqlEntity, TransactionMySqlEntity } from "."



@ObjectType()
@Entity("order")
export class OrderEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        orderId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 200 })
        fromAddress: string

    @Field(() => String)
    @Column({ type: "varchar", length: 200 })
        toAddress: string

    @Field(() => String)
    @Column({ type: "varchar", length: 200 })
        fromProvince: string

    @Field(() => String)
    @Column({ type: "varchar", length: 200 })
        toProvince: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50, nullable: true })
        receiverName: string

    @Field(() => String)
    @Column({ type: "varchar", length: 12, nullable: true })
        receiverPhone: string

    @Field(() => ID)
    @Column({ type: "uuid", length: 36 })
        accountId: string

    @Field(() => ID)
    @Column({ type: "uuid", length: 36 })
        transportServiceId: string

    @Field(() => Float)
    @Column({ type: "float", default: 1 })
        totalPrice: number

    @Field(() => String, { nullable: true })
    @Column({ type: "varchar", length: 2000, nullable: true })
        notes: string

    @Field(() => String)
    @Column({ type: "enum", enum: PaymentMethod })
        paymentMethod: PaymentMethod

    @Field(() => String)
    @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.UnCompleted })
        orderStatus: OrderStatus

    @Field(() => String)
    @Column({ type: "enum", enum: ServicePricingType })
        servicePricingType: ServicePricingType

    @Field(() => Float, {nullable: true})
    @Column({ type: "float", nullable: true })
        feedBackStars: number

    @Field(() => String, {nullable: true})
    @Column({ type: "varchar", length: 5000, nullable: true })
        feedBackContent: string

    @Field(() => String, {nullable: true})
    @Column({ type: "varchar", length: 5000, nullable: true })
        reasonToCancel: string

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => [OrderFishEntity], { nullable: true })
    @OneToMany(() => OrderFishEntity, (fishes) => fishes.order, { nullable: true })
        orderedFish: Array<OrderFishEntity>

    @Field(() => AccountEntity)
    @ManyToOne(() => AccountEntity, (account) => account.orders, { onDelete: "CASCADE" })
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

    @Field(() => [RouteStopMySqlEntity], { nullable: true })
    @OneToMany(() => RouteStopMySqlEntity, (routeStop) => routeStop.order, { nullable: true , onDelete: "CASCADE"})
        routeStops: Array<RouteStopMySqlEntity>

    @Field(() => [TransactionMySqlEntity], { nullable: true })
    @OneToMany(() => TransactionMySqlEntity, (transactions) => transactions.order, { nullable: true , onDelete: "CASCADE"})
        transactions: Array<TransactionMySqlEntity>

    //graphql
    @Field(() => Boolean, {nullable : true})
        hasCompletedFirstDelivery : boolean    
}
