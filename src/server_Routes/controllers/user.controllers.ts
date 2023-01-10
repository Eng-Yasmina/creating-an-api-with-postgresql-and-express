import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../database/CRUD/models/user.row.model";

//instance from the UserModel class
const userModel = new UserModel();

//create a user
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.create(req.body);
        res.json({
            data: {...user},
            message: 'done.. user created',
        });
    } catch (error) {
        next(error);
    }
};

//select all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.getAllUsers();
        res.json({
            data: user,
            message: 'done.. recieved all users',
        });
    } catch (error) {
        next(error);
    }
};

//select specific user
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.getUser(req.params.id as unknown as Number);
        res.json({
            data: user,
            message: 'done.. user recieved',
        });
    } catch (error) {
        next(error);
    }
};

//delete user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.deleteUser(req.params.id as unknown as Number);
        res.json({
            data: user,
            message: 'done.. user deleted',
        });
    } catch (error) {
        next(error);
    }
};