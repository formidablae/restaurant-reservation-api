import { Router } from 'express';
import RestaurantController from '../app/controllers/RestaurantController';

const router = Router();

router.get('/', RestaurantController.listAll);
router.post('/', RestaurantController.addNew);

export default router;
