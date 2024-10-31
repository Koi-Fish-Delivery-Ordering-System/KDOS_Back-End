import { RouteStatus, StopType } from "@common"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { OrderMySqlEntity, RouteMySqlEntity } from "."

@ObjectType()
@Entity("route_stop")
export class RouteStopEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        routeStopId: string

    @Field(() => ID)
    @Column({ type: "varchar", length: 36 })
        routeId: string

    @Field(() => ID)
    @Column({ type: "varchar", length: 36 })
        orderId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 1000 })
        address: string

    @Field(() => String)
    @Column({ type: "enum", enum: StopType })
        stopType: StopType

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
    @ManyToOne(() => RouteMySqlEntity, (route) => route.routeStops, { onDelete: "CASCADE" })
        route: RouteMySqlEntity

    @Field(() => OrderMySqlEntity)
    @ManyToOne(() => OrderMySqlEntity, (order) => order.routeStops, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "orderId" })
        order: OrderMySqlEntity
}