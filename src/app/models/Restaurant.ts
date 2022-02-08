import { Reservation } from "./entities/Reservation";

export interface IRestaurant {
    name: string;
    reservations: Reservation[];
}
