import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import { OrderFishEntity } from "./order_fish.entity"

@ObjectType()
@Entity("fish_qualification")
export class FishQualificationEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        fishQualificationId: string

    @Field(() => ID)
    @Column({ type: "uuid", length: 36 })
        fishId: string

    @Field(() => ID)
    @Column({ type: "uuid", length: 36 })
        fileId: string

    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date

    @Field(() => OrderFishEntity)
    @ManyToOne(() => OrderFishEntity, (fish) => fish.qualifications, { onDelete: "CASCADE" })
    @JoinColumn({ name: "fishId" })
        fish: OrderFishEntity

}
// @Field(() => String)
// @Column({ type: "varchar", length: 2000 })
//     name: string

// @Field(() => String)
// @Column({ type: "varchar", length: 1000 })
//     issuedFrom: string

// @Field(() => Date)
// @Column({ type: "datetime" })
//     issuedAt: Date

// @Field(() => String, { nullable: true })
// @Column({ type: "varchar", length: 1000, nullable: true })
//     url?: string