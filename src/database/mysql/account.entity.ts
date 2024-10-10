import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { RoleEntity } from "./role.entity"
import { OrderEntity } from "./order.entity"

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
    @Column({ type: String, length: 50, unique: true })
        email: string

    @Field(() => String)
    @Column({ type: String, length: 255, nullable: true })
        address: string

    @Field(() => Boolean)
    @Column({ type: "boolean", default: false })
        verified: boolean

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => [RoleEntity], { nullable: true })

    @OneToMany(
        () => RoleEntity,
        (role) => role.accountRoles,
    )
        roles: Array<RoleEntity>

    @Field(() => [OrderEntity])
    @OneToMany(() => OrderEntity, (order) => order.account)
        orders: Array<OrderEntity>
}
