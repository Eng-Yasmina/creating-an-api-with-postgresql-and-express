import { Request, Response, NextFunction } from "express";
import { OrderModel } from "../../endpoint/models/order.row.model";

//instance from the OrderModel class
const orderModel = new OrderModel();

//create an order
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderModel.create(req.body);
        res.json({
            data: {order},
            message: 'done.. order created',
        });
    } catch (error) {
        next(error);
    }
};

//Add orders to a spesific product add or add products to a spesific order
export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const addProduct = await orderModel.addProduct(parseInt(req.body.quantity), parseInt(req.body.orderId), parseInt(req.body.productId));
        res.json({
            data: {addProduct},
            message: 'done.. added a new order to this product',
        });
    } catch (error) {
        next(error);
    }
}

//Get current order by user
export const getCurrentOrderByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentOrder = await orderModel.getCurrentOrderByUser(req.body.userId as unknown as Number);
        res.json({
            data: currentOrder,
            message: 'done.. products of the current order by the user retrieved.. happy shopping:)',
        });
    } catch (error) {
        next(error);
    }
};
