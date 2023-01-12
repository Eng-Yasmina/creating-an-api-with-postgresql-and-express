import { Router } from "express";
import * as controllers from "../../controllers/user.controllers"


//invoke fn Router
const usersRoutes = Router();

//once you create a user, you should save his token in case you need it later
usersRoutes.post('/', controllers.create);
usersRoutes.post('/login', controllers.authenticate);
usersRoutes.get('/', controllers.getAllUsers);
//to show a sepecific user, you should provide it's token at first
usersRoutes.get('/:id', controllers.getUser);
//to delete a sepecific user, you should provide it's token at first
usersRoutes.delete('/:id', controllers.deleteUser);

export default usersRoutes;