import { RouteStatus } from "@common"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { DriverMySqlEntity, RouteStopMySqlEntity } from "."

@ObjectType()
@Entity("route")
export class RouteEntity {
    @PrimaryGeneratedColumn("uuid")
        routeId: string

    @Field(() => ID)
    @Column({ type: "string", length: 36 })
        driverId: string

    @Field(() => String)
    @Column({ type: "enum", enum: RouteStatus, default: RouteStatus.Pending })
        status: RouteStatus

    @Field(() => Date)
    @Column({type: "date", nullable: true})
        deliveryStartDate : Date

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date
    
    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => [RouteStopMySqlEntity])
    @OneToMany(() => RouteStopMySqlEntity, (routeStops) => routeStops.route)
        routeStops : Array<RouteStopMySqlEntity>

    @Field(() => DriverMySqlEntity)
    @ManyToOne(() => DriverMySqlEntity, (driver) => driver.routes)
    @JoinColumn({name : "driverId"})
        driver : DriverMySqlEntity
}