import { Router } from "express";
import * as controllers from "../../controllers/product.controllers"
import { verifyAuthToken } from "../../../middleware/authToken";


//invoke fn Router
const productsRoutes = Router();

//to create a new product, token required
productsRoutes.post('/', verifyAuthToken, controllers.create);
productsRoutes.get('/', controllers.getAllProducts);
productsRoutes.get('/:id', controllers.getProduct);
productsRoutes.delete('/:id', controllers.deleteProduct);

export default productsRoutes;