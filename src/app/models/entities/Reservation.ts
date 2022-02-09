import { IsDate, IsInt, IsNotEmpty, Max, Min, validateOrReject } from 'class-validator';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { IReservation } from '../Reservation';

@Entity()
export class Reservation implements IReservation {
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
    @IsDate()
    public order_datetime!: Date;

    @Column()
    @IsNotEmpty()
    public table_number!: number;

    @Column()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(4)
    public guests!: number;

    @Column()
    @CreateDateColumn()
    public createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    private validate(): Promise<void> {
        return validateOrReject(this);
    }
}
