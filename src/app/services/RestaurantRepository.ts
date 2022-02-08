import { Restaurant } from "../models/entities/Restaurant";

export interface IRestaurantRepository {
    get(): Promise<Restaurant[] | null>;
    getById(id: number): Promise<Restaurant | null>;
    add(restaurant: Restaurant): Promise<Restaurant | null>;
    delete(id: number): Promise<Restaurant | null>;
}
