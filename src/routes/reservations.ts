import { Router } from 'express';
import ReservationController from '../app/controllers/ReservationController';

const router = Router();

router.get('/', ReservationController.listAll);
router.post('/', ReservationController.addNew);

export default router;
