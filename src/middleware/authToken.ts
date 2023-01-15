import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../env_variables_config/config';

//middleware
export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check authorization header validate
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : '';
    const decoded = jwt.verify(req.body.token, `${config.tokenSecret}`);
    next();
  } catch (error) {
    //invalid authentication
    res.status(401);
    res.json({
      message: 'Sorry invalid token',
    });
  }
};
