import { Reservation } from "../models/entities/Reservation";

export interface IReservationRepository {
    get(): Promise<Reservation[] | null>;
    getById(id: number): Promise<Reservation | null>;
    add(reservation: Reservation): Promise<Reservation | null>;
    delete(id: number): Promise<Reservation | null>;
}
