import { Field, Float, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import { TransactionStatus, TransactionType } from "@common"
import { AccountMySqlEntity, OrderMySqlEntity } from "."

@ObjectType()
@Entity("transaction")
export class TransactionEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        transactionId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 36 })
        accountId: string

    @Field(() => String, {nullable: true})
    @Column({ type: "varchar", length: 36 , nullable: true})
        orderId: string

    @Field(() => String)
    @Column({ type: "enum", enum: TransactionType })
        type: TransactionType

    @Field(() => String)
    @Column({ type: "enum", enum: TransactionStatus, default: TransactionStatus.NotCompleted })
        status: TransactionStatus

    @Field(() => Float)
    @Column({ type: "float", default: 1 })
        amount: number

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => OrderMySqlEntity)
    @ManyToOne(() => OrderMySqlEntity, (order) => order.transactions, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "orderId" })
        order: OrderMySqlEntity

    @Field(() => AccountMySqlEntity)
    @ManyToOne(() => AccountMySqlEntity, (account) => account.transactions, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "accountId" })
        account: AccountMySqlEntity
}
