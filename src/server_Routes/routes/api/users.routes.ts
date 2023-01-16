import { Router } from 'express';
import * as controllers from '../../controllers/user.controllers';
import { verifyAuthToken } from '../../../middleware/authToken';

//invoke fn Router
const usersRoutes = Router();

//Once you create a new user, Store the token & use it for future HTTP requests
usersRoutes.post('/', controllers.create);
//to index all users, token required
usersRoutes.get('/', verifyAuthToken, controllers.getAllUsers);
//to show a sepecific user, token required
usersRoutes.get('/:id', verifyAuthToken, controllers.getUser);
//Authenticate user (login)
usersRoutes.post('/login', controllers.authenticate);
//to delete a sepecific user, token required
usersRoutes.delete('/:id', verifyAuthToken, controllers.deleteUser);

export default usersRoutes;
