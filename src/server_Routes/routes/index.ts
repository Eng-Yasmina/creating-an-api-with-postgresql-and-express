import { Router } from "express";
import usersRoutes from "./api/users.routes"
import productsRoutes from "./api/products.routes";
import ordersRoutes from "./api/order.routes";

//invoke fn Router
const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);

export default routes;