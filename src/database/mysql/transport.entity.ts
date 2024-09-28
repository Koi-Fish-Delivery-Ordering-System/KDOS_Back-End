import { Field, ID, ObjectType } from "@nestjs/graphql"
import { TransportType } from '@common'
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"

@ObjectType()
@Entity("transport")
export class TransportEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
        transportId: string
 
    @Field(() => String)
    @Column({ type: "enum", enum: TransportType })
        name: TransportType
    
    @Field(() => String)
    @CreateDateColumn()
        createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
        updatedAt: Date
}


    
    