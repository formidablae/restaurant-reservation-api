import { getRepository } from 'typeorm';
import { User } from "../models/entities/User";
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
}
