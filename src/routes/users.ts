import { Router } from 'express';
import UserController from '../app/controllers/UserController';

const router = Router();

router.get('/', UserController.listAll);
router.post('/', UserController.addNew);

export default router;
