import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"

@ObjectType()
@Entity("warehouse")
export class WarehouseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        warehouseId: string
    
    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        location: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        address: string

    @Field(() => String)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
        updatedAt: Date
}
