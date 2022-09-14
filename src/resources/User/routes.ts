import { Router } from 'express';
import authMiddleware from '../middlewares/AuthMiddleware';
import UserController from './UserController';

const routes = Router();

routes.post('/user/create', UserController.createUser);
routes.post('/user/update', authMiddleware, UserController.updateUser);
routes.delete('/user/delete', authMiddleware, UserController.deleteUser);
routes.get('/user/my', authMiddleware, UserController.userIndex);
routes.get('/user/find/:id', UserController.getUserById);
routes.get('/user/find', UserController.findUser);

export default routes;
