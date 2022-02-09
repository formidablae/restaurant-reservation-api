import * as bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty, Length, validateOrReject } from 'class-validator';
import {
    BeforeInsert,
    BeforeUpdate,
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
    @IsEmail()
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

    @BeforeInsert()
    @BeforeUpdate()
    private validate(): Promise<void> {
        return validateOrReject(this);
    }

    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
