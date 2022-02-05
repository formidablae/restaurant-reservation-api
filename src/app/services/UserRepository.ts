import { User } from "../models/entities/User";

export interface IUserRepository {
    get(): Promise<User[] | null>;
}
