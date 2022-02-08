import { Between, getRepository } from 'typeorm';
import { Reservation } from "../models/entities/Reservation";
import { IReservation } from '../models/Reservation';
import { IReservationRepository } from "./ReservationRepository";

export class ReservationsService implements IReservationRepository {

    async get(from = "1900-01-01", to = "2100-12-31"): Promise<Reservation[] | null> {
        // Get reservations from database
        try {
            const reservationRepository = getRepository(Reservation);
            const reservations = await reservationRepository.find({
                where: {
                    order_datetime: Between(from, to)
                }
            });
            return reservations;
        }
        catch (error) {
            return null  // TODO: handle errors
        }
    }

    async getById(id: number): Promise<Reservation | null> {

        const reservationRepository = getRepository(Reservation);
        try {
            const reservation = await reservationRepository.findOneOrFail(id);
            return reservation;
        } catch (error) {
            return null;  // TODO: handle errors
        }
    }

    async add(model: IReservation): Promise<Reservation | null> {
        const { user_id, restaurant_id, order_datetime, table_number, guests } = model;
        const reservation = new Reservation();
        reservation.user_id = user_id;
        reservation.restaurant_id = restaurant_id;
        reservation.order_datetime = order_datetime;
        reservation.table_number = table_number;
        reservation.guests = guests;
        const reservationRepository = getRepository(Reservation);
        try {
            const savedReservation = await reservationRepository.save(reservation);
            return savedReservation;
        } catch (e) {
            console.log(e);
            return Promise.reject(new Error('Error during reservation'));  // TODO: handle errors
        }
    }

    async delete(id: number): Promise<Reservation | null> {
        const reservationRepository = getRepository(Reservation);
        let reservation: Reservation;
        try {
            reservation = await reservationRepository.findOneOrFail(id);
            if (reservation) {
                reservationRepository.delete(id);
            }
            return null;
        } catch (error) {
            return null;  // TODO: handle errors
        }
    }
}
