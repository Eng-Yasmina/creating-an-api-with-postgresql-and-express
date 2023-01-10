import { Router } from "express";
import * as controllers from "../../controllers/product.controllers"


//invoke fn Router
const productsRoutes = Router();


productsRoutes.post('/', controllers.create);
productsRoutes.get('/', controllers.getAllProducts);
productsRoutes.get('/:id', controllers.getProduct);
productsRoutes.delete('/:id', controllers.deleteProduct);

export default productsRoutes;