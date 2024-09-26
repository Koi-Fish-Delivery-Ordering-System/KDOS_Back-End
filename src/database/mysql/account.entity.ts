import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"

@ObjectType()
@Entity("account")
export class AccountEntity {

    @Field(()=> ID)
    @PrimaryGeneratedColumn()
        accountId: string

    @Field(()=> String )
    @Column({ type: String, length: 50 })
        username: string

    @Column({ type: "varchar", length: 64, default: null })
        password: string

    @Column({ type: String, length: 50, unique: true })
        email: string

    @Column({ type: String, length: 255, nullable: true })
        address: string

    @Column({ type: "boolean", default: false })
        verified: boolean

    @CreateDateColumn()
        createdAt: Date

    @UpdateDateColumn()
        updatedAt: Date
}
