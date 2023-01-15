import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../endpoint/models/user.row.model";
import jwt from 'jsonwebtoken';
import config from "../../env_variables_config/config";

//instance from the UserModel class
const userModel = new UserModel();

//create a user
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.create(req.body);
        res.json({
            data: user,
            message: 'done.. user created'
        });
    } catch (error) {
        next(error);
    }
};

//Select all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.getAllUsers();
        res.json({
            data: user,
            message: 'done.. recieved all users'
        });
    } catch (error) {
        next(error);
    }
};

//Select a specific user
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.getUser(req.params.id as unknown as Number);
        res.json({
            data: user,
            message: 'done.. user recieved'
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
            message: 'done.. user deleted'
        });
    } catch (error) {
        next(error);
    }
};

//authenticate
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  
    try {
        const user = await userModel.authenticate(req.body.first_name, req.body.password)
        //token to be stored on the frontend and can be used for future authorizations with the API
        const token = jwt.sign({ user }, `${config.tokenSecret}`);
        if (!user) {
            res.status(401).json({
                message: 'wrong password..please try again'
            });
        }
        //Pass back the token so that the client can store the token & use it for future HTTP requests
        return res.json({
            data: { user, token },
            message: 'login successfully'
        });
    } catch(error) {
        next(error);
    }
  }

