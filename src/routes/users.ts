import { Router } from 'express';
import UserController from '../app/controllers/UserController';

const router = Router();

router.get('/', UserController.getFiltered);
router.get('/:id', UserController.getById);
router.post('/', UserController.addNew);
router.delete('/:id', UserController.delete);

export default router;
