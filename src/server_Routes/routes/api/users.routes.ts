import { Router } from "express";
import * as controllers from "../../controllers/user.controllers"


//invoke fn Router
const usersRoutes = Router();


usersRoutes.post('/', controllers.create);
usersRoutes.get('/', controllers.getAllUsers);
usersRoutes.get('/:id', controllers.getUser);
usersRoutes.delete('/:id', controllers.deleteUser);

export default usersRoutes;