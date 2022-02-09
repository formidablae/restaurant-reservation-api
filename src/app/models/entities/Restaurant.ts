import { IsInt, IsNotEmpty, Max, Min, validateOrReject } from 'class-validator';
import {
    BeforeInsert,
    BeforeUpdate,
    Column, CreateDateColumn, Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { IRestaurant } from '../Restaurant';
import { Reservation } from './Reservation';

@Entity()
export class Restaurant implements IRestaurant {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @IsNotEmpty()
    public name!: string;

    @OneToMany(type => Reservation, reservation => reservation.restaurant_id)
    reservations: Reservation[];

    @Column()
    @IsInt()
    @Min(5)
    @Max(5)
    tables: number;

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
