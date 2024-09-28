import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    OneToOne,  // Add this import
} from "typeorm"
import { OrderEntity } from "./order.entity"
import { FishEntity } from "./fish.entity"  // Add this import

@ObjectType()
@Entity("orderDetail")
export class OrderDetailEntity {
    @Field(() => ID)
    @PrimaryColumn()
    orderId: string;

    @Field(() => ID)
    @Column({ type: "uuid", length: 36 })
    fishId: string;

    @Field(() => Number)
    @Column({ type: "int" })
    quantity: number;
    
    @Field(() => Number)
    @Column({ type: "float" })
    volume: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    @Field(() => OrderEntity)
    @ManyToOne(() => OrderEntity, order => order.orderDetails)
    @JoinColumn({ name: "orderId" })
    order: OrderEntity;

    @Field(() => FishEntity)
    @OneToOne(() => FishEntity, fish => fish.orderDetails)
    @JoinColumn({ name: "fishId" })
    fish: FishEntity;
    
    
}
