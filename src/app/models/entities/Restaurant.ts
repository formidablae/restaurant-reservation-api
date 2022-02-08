import { IsNotEmpty } from 'class-validator';
import {
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
    @CreateDateColumn()
    public createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt!: Date;
}
