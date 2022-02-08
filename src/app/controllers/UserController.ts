import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../services/users.service';

const usersService = new UsersService();

class UserController {
    public static listAll(req: Request, res: Response, next: NextFunction) {
        usersService.get().then((data: any) => {
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

    public static addNew = (req: Request, res: Response, next: NextFunction) => {
        usersService.add(req.body).then((data: any) => {
            if (data) {
                res.json('User saved succesfully');
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        })
    }
}

export default UserController;
