import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, Length } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from 'typeorm';
import { IUser } from '../User';
import { Reservation } from './Reservation';

@Entity()
@Unique(['email'])
export class User implements IUser {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    @IsNotEmpty()
    public name!: string;

    @Column()
    @IsNotEmpty()
    @Length(4, 100)
    public email!: string;

    @Column()
    @IsNotEmpty()
    @Length(4, 100)
    public password!: string;

    @OneToMany(type => Reservation, reservation => reservation.user_id)
    reservations: Reservation[];

    @Column()
    @CreateDateColumn()
    public createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt!: Date;

    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
