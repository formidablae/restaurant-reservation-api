import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

class UserController {
    public static listAll(req: Request, res: Response, next: NextFunction) {
        userService.get().then((data: any) => {
            if (data && data.length > 0) {
                res.status(200).json(data);
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        });
    }

    public static addNew = (req: Request, res: Response, next: NextFunction) => {
        userService.add(req.body).then((data: any) => {
            if (data) {
                res.json('User saved succesfully');
            }
        }).catch((err: Error) => {
            next(new Error('Error occurred')); // TODO: handle error
        })
    }
}

export default UserController;
