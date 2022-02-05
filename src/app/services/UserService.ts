import { getRepository } from 'typeorm';
import { User } from "../models/entities/User";
import { IUser } from '../models/User';
import { IUserRepository } from "./UserRepository";

export class UserService implements IUserRepository {

    async get(): Promise<User[] | null> {
        // Get users from database
        try {
            const userRepository = getRepository(User);
            const users = await userRepository.find({});
            return users;
        }
        catch (error) {
            return null  // TODO: handle errors
        }
    }

    async getById(id: number): Promise<User | null> {

        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            return user;
        } catch (error) {
            return null;  // TODO: handle errors
        }
    }

    async add(model: IUser): Promise<User | null> {
        const { name, email, password } = model;
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        const userRepository = getRepository(User);
        try {
            const savedUser = await userRepository.save(user);
            return savedUser;
        } catch (e) {
            console.log(e);
            return Promise.reject(new Error('User with email: ' + email + ' already exists'));  // TODO: handle errors
        }
    }

    async delete(id: number): Promise<User | null> {
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
            if (user) {
                userRepository.delete(id);
            }
            return null;
        } catch (error) {
            return null;  // TODO: handle errors
        }
    }
}
