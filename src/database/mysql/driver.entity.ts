import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, OneToMany, OneToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm"
import { DriverStatus } from "@common"
import { AccountMySqlEntity, RouteMySqlEntity } from "."

@ObjectType()
@Entity("driver")
export class DriverEntity {

    @Field(() => ID)
    @PrimaryColumn("uuid")
        driverId: string

    @Field(() => String)
    @Column({ type: String, length: 100, nullable: true })
        currentProvince: string

    @Field(() => String)
    @Column({ type: "enum", enum: DriverStatus, default: DriverStatus.Ready })
        status: DriverStatus

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => AccountMySqlEntity, { nullable: true })
    @OneToOne(
        () => AccountMySqlEntity,
        (account) => account.driver,
        { cascade: true, onDelete: "CASCADE", nullable: true }
    )
    @JoinColumn({ name: "driverId" })
        account: AccountMySqlEntity

    @Field(() => [RouteMySqlEntity])
    @OneToMany(() => RouteMySqlEntity, (route) => route.driver)
        routes : Array<RouteMySqlEntity>

}
