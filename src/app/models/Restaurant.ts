import { Reservation } from "./entities/Reservation";

export interface IRestaurant {
    name: string;
    tables: number;
    reservations: Reservation[];
}
