import { RouteStatus } from "@common"
import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { OrderMySqlEntity, RouteMySqlEntity } from "."

@ObjectType()
@Entity("route_stop")
export class RouteStopEntity {

    @Field(() => ID)
    @PrimaryColumn("uuid")
        routeStopId: string

    @Field(() => ID)
    @Column({ type: "varchar", length: 36 })
        routeId: string

    @Field(() => Int)
    @Column({ type: "int", nullable: false})
        position: number

    @Field(() => String)
    @Column({ type: "varchar", length: 1000 })
        currentLocation: string

    @Field(() => Date)
    @Column({ type: "datetime", nullable: true })
        lastUpdatedAt: Date

    @Field(() => String)
    @Column({ type: "enum", enum: RouteStatus, default: RouteStatus.Pending })
        status: RouteStatus

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => RouteMySqlEntity)
    @ManyToOne(() => RouteMySqlEntity, (route) => route.routeStops, {onDelete: "CASCADE"})
        route : RouteMySqlEntity

    @Field(() => OrderMySqlEntity)
    @OneToOne(() => OrderMySqlEntity, (order) => order.atRouteStop, { nullable: true, cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "routeStopId" })
        order : OrderMySqlEntity
}