import { RouteStatus } from "@common"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { RouteMySqlEntity } from "."

@ObjectType()
@Entity("route_stop")
export class RouteStopEntity {
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
}