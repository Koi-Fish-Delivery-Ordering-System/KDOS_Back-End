import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToOne,
} from "typeorm"    

import { OrderDetailEntity } from './orderDetail.entity';

@ObjectType()
@Entity("fish")
export class FishEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        fishId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        name: string
        
    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        type: string

    @Field(() => String)
    @Column({ type: "varchar", length: 50 })
        certification: string

    // @Field(() => String)
    // @Column({ type: "varchar", length: 50 })
    //     Health: string
        
    @Field(() => Date)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn()
        updatedAt: Date
    
    @Field(() => OrderDetailEntity) 
    @OneToOne(() => OrderDetailEntity, orderDetail => orderDetail.fish)
    orderDetails: OrderDetailEntity[];
        
}