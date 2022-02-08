import { NextFunction, Request, Response } from 'express';
import { RestaurantsService } from '../services/restaurants.service';

const restaurantsService = new RestaurantsService();

class RestaurantController {
    public static listAll(req: Request, res: Response, next: NextFunction) {
        restaurantsService.get().then((data: any) => {
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

    public static addNew = (req: Request, res: Response, next: NextFunction) => {
        restaurantsService.add(req.body).then((data: any) => {
            if (data) {
                res.json('Restaurant saved succesfully');
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        })
    }
}

export default RestaurantController;
