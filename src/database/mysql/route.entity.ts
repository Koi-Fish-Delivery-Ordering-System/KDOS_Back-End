import { RouteStatus } from "@common"
import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { DriverMySqlEntity, RouteStopMySqlEntity } from "."

@ObjectType()
@Entity("route")
export class RouteEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        routeId: string

    @Field(() => ID)
    @Column({ type: "string", length: 36 })
        driverId: string

    @Field(() => String)
    @Column({ type: "enum", enum: RouteStatus, default: RouteStatus.Pending })
        status: RouteStatus

    @Field(() => Date, {nullable: true})
    @Column({type: "datetime", nullable: true})
        deliveryStartDate : Date

    @Field(() => String, {nullable: true})
    @Column({ type: "varchar", length: 5000, nullable: true })
        notes: string

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date
    
    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => [RouteStopMySqlEntity], {nullable: true})
    @OneToMany(() => RouteStopMySqlEntity, (routeStops) => routeStops.route, {nullable: true})
        routeStops : Array<RouteStopMySqlEntity>

    @Field(() => DriverMySqlEntity)
    @ManyToOne(() => DriverMySqlEntity, (driver) => driver.routes, {nullable: true})
    @JoinColumn({name : "driverId"})
        driver : DriverMySqlEntity

    //graphQL
    @Field(() => Int)
        numberOfOrders : number
}