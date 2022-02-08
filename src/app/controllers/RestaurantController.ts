import { NextFunction, Request, Response } from 'express';
import { Restaurant } from '../models/entities/Restaurant';
import { RestaurantsService } from '../services/restaurants.service';

const restaurantsService = new RestaurantsService();

class RestaurantController {

    public static getFiltered = (req: Request, res: Response, next: NextFunction) => {
        restaurantsService.get(
            req.query.booked as string as "All" | "Full" | "NotFull",
            req.query.from as string,
            req.query.to as string,
            req.query.sort as string as "ASC" | "DESC",
            req.query.page as unknown as number,
            req.query.limit as unknown as number,
        ).then((data: Restaurant[] | null) => {
            if (data && data.length > 0) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({ message: 'No restaurants found' });
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        });
    }

    public static getById = (req: Request, res: Response, next: NextFunction) => {
        restaurantsService.getById(req.params.id as unknown as number).then((data: Restaurant | null) => {
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({ message: 'No restaurant with that id found' });
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        });
    }

    public static addNew = (req: Request, res: Response, next: NextFunction) => {
        restaurantsService.add(req.body).then((data: Restaurant | null) => {
            if (data) {
                res.json('Restaurant saved succesfully');
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        })
    }

    public static delete = (req: Request, res: Response, next: NextFunction) => {
        restaurantsService.delete(req.params.id as unknown as number).then((data: true | null) => {
            if (data) {
                res.json('Restaurant deleted succesfully');
            }
            else {
                res.status(404).json({ message: 'No restaurant with that id found' });
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        })
    }
}

export default RestaurantController;
