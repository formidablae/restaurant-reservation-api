import { Router } from 'express';
import RestaurantController from '../app/controllers/RestaurantController';

const router = Router();

router.get('/', RestaurantController.getFiltered);
router.get('/:id', RestaurantController.getById);
router.post('/', RestaurantController.addNew);
router.delete('/:id', RestaurantController.delete);

export default router;
