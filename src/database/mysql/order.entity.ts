import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm"
import { AccountEntity } from "./account.entity"
@ObjectType()
@Entity("order")
export class OrderEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        orderId: string
        
    @Field(() => ID)
    @Column({ type: "uuid", length: 36 })
        accountId: string

    @ManyToOne(() => AccountEntity, (account) => account.orders)
    @JoinColumn({ name: "accountId" })
        account: AccountEntity
}
