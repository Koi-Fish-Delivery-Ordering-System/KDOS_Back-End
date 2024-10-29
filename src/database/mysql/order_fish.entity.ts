import { FishGender } from "@common"
import { Field, Float, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import { FishHealthEntity } from "./fish_health.entity"
import { FishQualificationEntity } from "./fish_qualifications.entity"
import { OrderEntity } from "./order.entity"

@ObjectType()
@Entity("order_fish")
export class OrderFishEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        orderFishId: string

    @Field(() => ID)
    @Column({ type: "varchar", length: 36 })
        orderId: string
    
    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        name: string

    @Field(() => String)
    @Column({ type: "enum", enum: FishGender })
        gender: FishGender

    @Field(() => String)
    @Column({ type: "varchar", length: 100 })
        species: string

    @Field(() => Number)
    @Column({ type: "int", default: 1 })
        ageInMonth: number
    
    @Field(() => Float)
    @Column({ type: "float", default: 1 })
        weight: number

    @Field(() => Float)
    @Column({ type: "float", default: 1 })
        length: number

    @Field(() => String, { nullable: true })
    @Column({ type: "varchar", length: 2000, nullable: true })
        description: string

    @Field(() => FishQualificationEntity, { nullable: true })
    @OneToMany(() => FishQualificationEntity, (qualification) => qualification.fish, { nullable: true })
        qualifications: Array<FishQualificationEntity>

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => FishHealthEntity)
    @OneToOne(() => FishHealthEntity, (health) => health.fishHealthId, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "healthId" })
        health: FishHealthEntity

    @Field(() => OrderEntity)
    @ManyToOne(() => OrderEntity, (order) => order.orderedFish, {onDelete: "CASCADE"})
    @JoinColumn({name : "orderId"})
        order : OrderEntity

}
