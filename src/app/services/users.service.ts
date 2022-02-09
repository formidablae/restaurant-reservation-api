import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from "../models/entities/User";
import { IUserRepository } from "./UserRepository";

export class UsersService implements IUserRepository {

    async get(): Promise<User[] | null> {
        // Get users from database
        try {
            const userRepository = getRepository(User);
            const users = await userRepository.find({});
            return users;
        }
        catch (error) {
            console.log(error);
            return null  // TODO: handle errors
        }
    }

    async getById(id: number): Promise<User | null> {
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            return user;
        } catch (error) {
            console.log(error);
            return null;  // TODO: handle errors
        }
    }

    async add(model: User): Promise<User | null> {
        const { name, email, password } = model;
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;

        const validationErrors = await validate(user);
        if (validationErrors.length > 0) {
            throw new Error(`Validation failed!`);
        }
        try {
            const userRepository = getRepository(User);
            const savedUser = await userRepository.save(user);
            return savedUser;
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error('User with email: ' + email + ' already exists'));  // TODO: handle errors
        }
    }

    async delete(id: number): Promise<true | null> {
        let user: User;
        try {
            const userRepository = getRepository(User);
            user = await userRepository.findOneOrFail(id);
            if (user) {
                userRepository.delete(id);
            }
            return true;
        } catch (error) {

            console.log(error);
            return null;  // TODO: handle errors
        }
    }
}
