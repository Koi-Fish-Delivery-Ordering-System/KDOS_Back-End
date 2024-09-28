import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm"
import { AccountEntity } from "./account.entity"
import { OrderDetailEntity } from "./orderDetail.entity"

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
    @Column({ type: "varchar", length: 50 })
        deliveryAddress: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        recipientPhone: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        recipientEmail: string

    @Field(() => ID)
    @Column({ type: "uuid", length: 36 })
        accountId: string

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date


    @Field(() => AccountEntity)
    @ManyToOne(() => AccountEntity, (account) => account.orders)
    @JoinColumn({ name: "accountId" })
        account: AccountEntity

    @Field(() => [OrderDetailEntity])
    @OneToMany(() => OrderDetailEntity, orderDetail => orderDetail.order)
    orderDetails: OrderDetailEntity[];
}
