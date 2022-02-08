import { Router } from 'express';
import reservations from './reservations';
import restaurants from './restaurants';
import users from './users';

const routes = Router();

routes.use('/users', users);
routes.use('/restaurants', restaurants);
routes.use('/reservations', reservations);

export { routes };
