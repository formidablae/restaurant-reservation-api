import { Router } from 'express';
import users from './users';

const routes = Router();

routes.use('/users', users);

export { routes };
