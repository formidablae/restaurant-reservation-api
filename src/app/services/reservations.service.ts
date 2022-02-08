import { getRepository } from 'typeorm';
import { Reservation } from "../models/entities/Reservation";
import { IReservationRepository } from "./ReservationRepository";

export class ReservationsService implements IReservationRepository {

    async get(
        user_id = undefined as undefined | number,
        restaurant_id = undefined as undefined | number,
        from = "1900-01-01",
        to = "2100-12-31",
        sort = "ASC" as "ASC" | "DESC",
        page = 1,
        limit = 10
    ): Promise<Reservation[] | null> {
        // Get reservations from database
        try {
            const reservationRepository = getRepository(Reservation);
            const query = reservationRepository.createQueryBuilder("reservation");
            if (user_id) {
                query.where("reservation.user_id = :user_id", { user_id });
            }
            if (restaurant_id) {
                query.where("reservation.restaurant_id = :restaurant_id", { restaurant_id });
            }
            query.andWhere("reservation.order_datetime >= :from", { from });
            query.andWhere("reservation.order_datetime <= :to", { to });
            query.orderBy("reservation.order_datetime", sort);
            query.skip((page - 1) * limit);
            query.take(limit);
            const reservations = await query.getMany();
            return reservations;
        }
        catch (error) {
            console.log(error);
            return null  // TODO: handle errors
        }
    }

    async getById(id: number): Promise<Reservation | null> {
        const reservationRepository = getRepository(Reservation);
        try {
            const reservation = await reservationRepository.findOneOrFail(id);
            return reservation;
        } catch (error) {
            console.log(error);
            return null;  // TODO: handle errors
        }
    }

    async add(model: Reservation): Promise<Reservation | null> {
        const { user_id, restaurant_id, order_datetime, table_number, guests } = model;
        const reservation = new Reservation();
        reservation.user_id = user_id;
        reservation.restaurant_id = restaurant_id;
        reservation.order_datetime = order_datetime;
        reservation.table_number = table_number;
        reservation.guests = guests;
        try {
            const reservationRepository = getRepository(Reservation);
            const savedReservation = await reservationRepository.save(reservation);
            return savedReservation;
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error('Error during reservation'));  // TODO: handle errors
        }
    }

    async delete(id: number): Promise<true | null> {
        const reservationRepository = getRepository(Reservation);
        let reservation: Reservation;
        try {
            reservation = await reservationRepository.findOneOrFail(id);
            if (reservation) {
                reservationRepository.delete(id);
            }
            return true;
        } catch (error) {
            console.log(error);
            return null;  // TODO: handle errors
        }
    }
}
