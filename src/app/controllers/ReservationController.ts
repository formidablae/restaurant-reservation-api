import { NextFunction, Request, Response } from 'express';
import { ReservationsService } from '../services/reservations.service';

const reservationsService = new ReservationsService();

class ReservationController {
    public static listAll(req: Request, res: Response, next: NextFunction) {
        reservationsService.get(req.query.from as string, req.query.to as string).then((data: any) => {
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

    public static addNew = (req: Request, res: Response, next: NextFunction) => {
        reservationsService.add(req.body).then((data: any) => {
            if (data) {
                res.json('Reservation saved succesfully');
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        })
    }
}

export default ReservationController;
