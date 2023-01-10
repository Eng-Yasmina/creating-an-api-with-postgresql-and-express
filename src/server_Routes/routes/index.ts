import { Router } from "express";
import usersRoutes from "./api/users.routes"

//invoke fn Router
const routes = Router();

routes.use('/users', usersRoutes);


export default routes;