import { Router } from 'express';
import * as controllers from '../../controllers/order.controllers';
import { verifyAuthToken } from '../../../middleware/authToken';

//invoke fn Router
const ordersRoutes = Router();

//create a new order
ordersRoutes.post('/', controllers.create);
//Add orders to a spesific product or add  products to a spesific order
ordersRoutes.post('/:id/products', controllers.addProduct);
//Get the current order by the user, token required
ordersRoutes.get('/current', verifyAuthToken, controllers.getCurrentOrderByUser);
//Get completed orders by the user
ordersRoutes.get('/completed', controllers.completedOrdersByUser);

export default ordersRoutes;
