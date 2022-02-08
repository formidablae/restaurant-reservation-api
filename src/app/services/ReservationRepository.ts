import { Reservation } from "../models/entities/Reservation";

export interface IReservationRepository {
    get(
        user_id: undefined | number,
        restaurant_id: undefined | number,
        from: string,
        to: string,
        sort: "ASC" | "DESC",
        page: number,
        limit: number
    ): Promise<Reservation[] | null>;
    getById(id: number): Promise<Reservation | null>;
    add(reservation: Reservation): Promise<Reservation | null>;
    delete(id: number): Promise<true | null>;
}
