import { Restaurant } from "../models/entities/Restaurant";

export interface IRestaurantRepository {
    get(
        booked: "All" | "Full" | "NotFull",
        from: string,
        to: string,
        sort: "ASC" | "DESC",
        page: number,
        limit: number
    ): Promise<Restaurant[] | null>;
    getById(id: number): Promise<Restaurant | null>;
    add(restaurant: Restaurant): Promise<Restaurant | null>;
    delete(id: number): Promise<true | null>;
}
