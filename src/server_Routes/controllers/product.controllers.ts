import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../../database/CRUD/models/product.row.model";

//instance from the ProductModel class
const productModel = new ProductModel();

//create a product
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.create(req.params.name as unknown as string, req.params.price as unknown as Number);
        res.json({
            data: {...product},
            message: 'done.. product created',
        });
    } catch (error) {
        next(error);
    }
};

//select all products
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.getAllProducts();
        res.json({
            data: product,
            message: 'done.. recieved all products',
        });
    } catch (error) {
        next(error);
    }
};

//select specific product
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.getProduct(req.params.id as unknown as Number);
        res.json({
            data: product,
            message: 'done.. product recieved',
        });
    } catch (error) {
        next(error);
    }
};

//delete product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.deleteProduct(req.params.id as unknown as Number);
        res.json({
            data: product,
            message: 'done.. product deleted',
        });
    } catch (error) {
        next(error);
    }
};