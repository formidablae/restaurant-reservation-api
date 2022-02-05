import { IsNotEmpty } from 'class-validator';
import {
    Column, Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @IsNotEmpty()
    public name!: string;
}
