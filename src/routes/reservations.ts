import { Router } from 'express';
import ReservationController from '../app/controllers/ReservationController';

const router = Router();

router.get('/', ReservationController.getFiltered);
router.get('/:id', ReservationController.getById);
router.post('/', ReservationController.addNew);
router.delete('/:id', ReservationController.delete);

export default router;
