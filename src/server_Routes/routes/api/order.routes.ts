import { Router } from "express";
import * as controllers from "../../controllers/order.controllers"


//invoke fn Router
const ordersRoutes = Router();

//create a new order
ordersRoutes.post('/', controllers.create);
//Add orders to a spesific product or add  products to a spesific order
ordersRoutes.post('/:id/products', controllers.addProduct);
//Get the current order by the user
ordersRoutes.get('/current', controllers.getCurrentOrderByUser);
//Get completed orders by the user
ordersRoutes.get('/active', controllers.completedOrdersByUser);


export default ordersRoutes;