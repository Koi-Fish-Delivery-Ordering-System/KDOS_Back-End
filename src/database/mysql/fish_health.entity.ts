import { Field, Float, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm"
import { OrderFishEntity } from "./order_fish.entity"

@ObjectType()
@Entity("fish_health")
export class FishHealthEntity {
    @Field(() => ID)
    @PrimaryColumn("uuid")
        fishHealthId: string

    @Field(() => Float)
    @Column({ type: "float", default: 1 })
        weight: number

    @Field(() => Float)
    @Column({ type: "float", default: 1 })
        length: number

    @Field(() => String)
    @Column({ type: "varchar", length: 1000 })
        color: string

    @Field(() => String)
    @Column({ type: "varchar", length: 1000 })
        apperance: string

    @Field(() => String)
    @Column({ type: "varchar", length: 1000 })
        temperature: string

    @Field(() => String)
    @Column({ type: "varchar", length: 1000 })
        behavior: string

    @Field(() => String)
    @Column({ type: "varchar", length: 1000 })
        waterQuality: string

    @Field(() => String)
    @Column({ type: "varchar", length: 1000 })
        chechUpNote: string

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        checkedUpAt: Date

    @Field(() => OrderFishEntity, { nullable: true })
    @OneToOne(() => OrderFishEntity, (fish) => fish.health, { cascade: true, onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "fishHealthId" })
        fish: OrderFishEntity

}
