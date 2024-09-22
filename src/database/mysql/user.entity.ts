import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column({ type: String, length: 50 })
  username: string;

  @Column({ type: String, length: 255, unique: true })
  email: string;

  @Column({ type: String, length: 20, nullable: true })
  phone_number: string;

  @Column({ type: String, length: 255, nullable: true })
  address: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
