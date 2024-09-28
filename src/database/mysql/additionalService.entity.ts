import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"

@ObjectType()
@Entity("additionalService")
export class AdditionalServiceEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        additionalServiceId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        name: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        price: string

    @Field(() => String)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
        updatedAt: Date
}


