import { Field, Float, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"

import { OrderEntity } from "./order.entity"
import { DriverMySqlEntity, TransactionMySqlEntity } from "."
import { SystemRoles } from "@common"

//tạo bảng dưới dạng code
// Object type, Field => GraphQL ko thêm thì vẫn tạo đc bảng nhưng graphQL ko hiểu => ko truy vấn được
// Column => tạo cột 
// 1 - n, 1 - 1, n - n => sài nhiều nhất là thằng 1 - n, ùy trường hợp sài 1 - 1

@ObjectType()
@Entity("account")
export class AccountEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        accountId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        username: string

    @Field(() => String)
    @Column({ type: "varchar", length: 64, default: null, nullable: true })
        password: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        fullName: string

    @Field(() => String)
    @Column({ type: String, length: 50, unique: true })
        email: string

    @Field(() => String)
    @Column({ type: String, length: 12, nullable: true })
        phone: string

    @Field(() => String, { nullable: true })
    @Column({ type: String, length: 1000, nullable: true })
        address: string

    @Field(() => ID)
    @Column({ type: "varchar", length: 36, nullable: true })
        driverId: string

    @Field(() => Float)
    @Column({ type: "float", default: 1 })
        walletAmount: number

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => String)
    @Column({ type: "enum", enum: SystemRoles, default: SystemRoles.Customer})
        role: SystemRoles

    @Field(() => [OrderEntity])
    @OneToMany(() => OrderEntity, (order) => order.account)
        orders: Array<OrderEntity>

    @Field(() => DriverMySqlEntity, { nullable: true })
    @OneToOne(
        () => DriverMySqlEntity,
        (driver) => driver.account,
        { nullable: true, onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "driverId" })
        driver: DriverMySqlEntity

    @Field(() => [TransactionMySqlEntity], { nullable: true })
    @OneToMany(() => TransactionMySqlEntity, (transactions) => transactions.account)
        transactions: Array<TransactionMySqlEntity>

}
