import { getRepository } from 'typeorm';
import { Restaurant } from "../models/entities/Restaurant";
import { IRestaurant } from '../models/Restaurant';
import { IRestaurantRepository } from "./RestaurantRepository";

export class RestaurantsService implements IRestaurantRepository {

    async get(): Promise<Restaurant[] | null> {
        // Get restaurants from database
        try {
            const restaurantRepository = getRepository(Restaurant);
            const restaurants = await restaurantRepository.find({});
            return restaurants;
        }
        catch (error) {
            return null  // TODO: handle errors
        }
    }

    async getById(id: number): Promise<Restaurant | null> {

        const restaurantRepository = getRepository(Restaurant);
        try {
            const restaurant = await restaurantRepository.findOneOrFail(id);
            return restaurant;
        } catch (error) {
            return null;  // TODO: handle errors
        }
    }

    async add(model: IRestaurant): Promise<Restaurant | null> {
        const { name } = model;
        const restaurant = new Restaurant();
        restaurant.name = name;
        const restaurantRepository = getRepository(Restaurant);
        try {
            const savedRestaurant = await restaurantRepository.save(restaurant);
            return savedRestaurant;
        } catch (e) {
            console.log(e);
            return Promise.reject(new Error('Error during creation of the restaurant; ' + name));  // TODO: handle errors
        }
    }

    async delete(id: number): Promise<Restaurant | null> {
        const restaurantRepository = getRepository(Restaurant);
        let restaurant: Restaurant;
        try {
            restaurant = await restaurantRepository.findOneOrFail(id);
            if (restaurant) {
                restaurantRepository.delete(id);
            }
            return null;
        } catch (error) {
            return null;  // TODO: handle errors
        }
    }
}
