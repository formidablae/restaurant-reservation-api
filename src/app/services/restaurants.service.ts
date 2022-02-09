import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Reservation } from '../models/entities/Reservation';
import { Restaurant } from "../models/entities/Restaurant";
import { IRestaurantRepository } from "./RestaurantRepository";

export class RestaurantsService implements IRestaurantRepository {
    async get(
        booked = "All" as "All" | "Full" | "NotFull",
        from = new Date(new Date().setHours(19, 0, 0, 0)).toISOString(),
        to = new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
        sort = "ASC" as "ASC" | "DESC",
        page = 1,
        limit = 10
    ): Promise<Restaurant[] | null> {
        // Get restaurants from database
        if (booked === "Full" || booked === "NotFull") {
            const TABLES = 5;
            const daysDifferenceFromTo = Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / (1000 * 3600 * 24));
            let totalHours = 0;
            if (daysDifferenceFromTo > 0) {
                const firstDayMidnight: Date = new Date(new Date(from).setHours(23, 59, 59, 999));
                const hoursFromTillMidnight: number = Math.ceil((firstDayMidnight.getTime() - new Date(from).getTime()) / (1000 * 3600));
                totalHours += hoursFromTillMidnight;
            }
            for (let i = 1; i < daysDifferenceFromTo - 1; i++) {
                const nextDate: Date = new Date(new Date(from).getTime() + i * (1000 * 3600 * 24));
                const hoursFrom19TillMidnight: number = 5;
                totalHours += hoursFrom19TillMidnight;
            }
            const hasLastDay = new Date(new Date(to).setHours(19, 0, 0, 0)).getTime() < new Date(to).getTime();
            if (daysDifferenceFromTo > 0 && hasLastDay) {
                const lastDay19: Date = new Date(new Date(to).setHours(19, 0, 0, 0));
                const hoursFrom19TillTo: number = Math.ceil((new Date(to).getTime() - lastDay19.getTime()) / (1000 * 3600));
                totalHours += hoursFrom19TillTo;
            }

            try {
                const maxReservations = TABLES * totalHours;
                const restaurantRepository = getRepository(Restaurant);
                const query = restaurantRepository.createQueryBuilder("restaurant");

                query.where(queryBuilder => {
                    let sign = "< ";
                    if (booked === "Full") {
                        sign = ">= ";
                    }

                    const subQuery = queryBuilder
                        .subQuery()
                        .select(["reservation.restaurant_id"])
                        .from(Reservation, 'reservation')
                        .where("reservation.order_datetime >= :from", { from: from })
                        .andWhere("reservation.order_datetime <= :to", { to: to })
                        .groupBy("reservation.restaurant_id")
                        .having("COUNT(reservation.restaurant_id) " + sign + maxReservations)  // between 19:00 and 24:00, in 5 tables for 1 hour can be max 25 reservations supposing booking is possible only at 19:00, 20:00, 21:00, 22:00, 23:00
                        .getQuery();

                    return 'restaurant.id IN ' + subQuery;
                })
                
                query.orderBy("restaurant.name", sort)
                query.take(limit)
                query.skip((page - 1) * limit);

                const restaurants = await query.getMany();
                return restaurants;
            }
            catch (error) {
                console.log(error);
                return null  // TODO: handle errors
            }
        }
        else {  // get all restaurants
            try {
                const restaurantRepository = getRepository(Restaurant);
                const query = restaurantRepository.createQueryBuilder("restaurant");
                query.orderBy("restaurant.name", sort)
                query.take(limit)
                query.skip((page - 1) * limit);
                const restaurants = await query.getMany();
                return restaurants;
            }
            catch (error) {
                console.log(error);
                return null  // TODO: handle errors
            }
        }
    }

    async getById(id: number): Promise<Restaurant | null> {
        try {
            const restaurantRepository = getRepository(Restaurant);
            const restaurant = await restaurantRepository.findOneOrFail(id);
            return restaurant;
        } catch (error) {
            console.log(error);
            return null;  // TODO: handle errors
        }
    }

    async add(model: Restaurant): Promise<Restaurant | null> {
        const { name, tables } = model;
        const restaurant = new Restaurant();
        restaurant.name = name;
        restaurant.tables = tables;

        const validationErrors = await validate(restaurant);
        if (validationErrors.length > 0) {
            throw new Error(`Validation failed!`);
        }
        
        try {
            const restaurantRepository = getRepository(Restaurant);
            const savedRestaurant = await restaurantRepository.save(restaurant);
            return savedRestaurant;
        } catch (error) {
            console.log(error);
            return Promise.reject(new Error('Error during creation of the restaurant; ' + name));  // TODO: handle errors
        }
    }

    async delete(id: number): Promise<true | null> {
        let restaurant: Restaurant;
        try {
            const restaurantRepository = getRepository(Restaurant);
            restaurant = await restaurantRepository.findOneOrFail(id);
            if (restaurant) {
                restaurantRepository.delete(id);
            }
            return true;
        } catch (error) {
            console.log(error);
            return null;  // TODO: handle errors
        }
    }
}
