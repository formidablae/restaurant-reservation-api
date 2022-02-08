import { NextFunction, Request, Response } from 'express';
import { Reservation } from '../models/entities/Reservation';
import { ReservationsService } from '../services/reservations.service';

const reservationsService = new ReservationsService();

class ReservationController {
    public static getFiltered = (req: Request, res: Response, next: NextFunction) => {
        reservationsService.get(
            req.query.user_id as unknown as number,
            req.query.restaurant_id as unknown as number,
            req.query.from as string,
            req.query.to as string,
            req.query.sort as string as "ASC" | "DESC",
            req.query.page as unknown as number,
            req.query.limit as unknown as number,
        ).then((data: Reservation[] | null) => {
            if (data && data.length > 0) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({ message: 'No reservations found' });
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        });
    }

    public static getById = (req: Request, res: Response, next: NextFunction) => {
        reservationsService.getById(req.params.id as unknown as number).then((data: Reservation | null) => {
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({ message: 'No reservation with that id found' });
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        });
    }
    
    public static addNew = (req: Request, res: Response, next: NextFunction) => {
        reservationsService.add(req.body).then((data: Reservation | null) => {
            if (data) {
                res.json('Reservation saved succesfully');
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        })
    }

    public static delete = (req: Request, res: Response, next: NextFunction) => {
        reservationsService.delete(req.params.id as unknown as number).then((data: true | null) => {
            if (data) {
                res.json('Reservation deleted succesfully');
            }
            else {
                res.status(404).json({ message: 'No reservation with that id found' });
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        })
    }
}

export default ReservationController;
