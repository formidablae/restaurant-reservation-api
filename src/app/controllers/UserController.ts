import { NextFunction, Request, Response } from 'express';
import { User } from '../models/entities/User';
import { UsersService } from '../services/users.service';

const usersService = new UsersService();

class UserController {
    public static getFiltered(req: Request, res: Response, next: NextFunction) {
        usersService.get().then((data: User[] | null) => {
            if (data && data.length > 0) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({ message: 'No users found' });
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        });
    }

    public static getById = (req: Request, res: Response, next: NextFunction) => {
        usersService.getById(req.params.id as unknown as number).then((data: User | null) => {
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({ message: 'No user with that id found' });
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        });
    }

    public static addNew = (req: Request, res: Response, next: NextFunction) => {
        usersService.add(req.body).then((data: User | null) => {
            if (data) {
                res.json('User saved succesfully');
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        })
    }

    public static delete = (req: Request, res: Response, next: NextFunction) => {
        usersService.delete(req.params.id as unknown as number).then((data: true | null) => {
            if (data) {
                res.json('User deleted succesfully');
            }
            else {
                res.status(404).json({ message: 'No user with that id found' });
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        })
    }
}

export default UserController;
