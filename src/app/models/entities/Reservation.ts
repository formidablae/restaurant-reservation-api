import { IsNotEmpty } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @IsNotEmpty()
    public user_id!: number;

    @Column()
    @IsNotEmpty()
    public restaurant_id!: number;

    @Column()
    @IsNotEmpty()
    public order_datetime!: Date;

    @Column()
    @IsNotEmpty()
    public table_number!: number;

    @Column()
    @IsNotEmpty()
    public guests!: number;

    @Column()
    @CreateDateColumn()
    public createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt!: Date;
}
