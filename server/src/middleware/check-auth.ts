import { Request, Response, NextFunction } from "express";
import HttpError from "../models/http-error";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_KEY = process.env.JWT_KEY! as string;

interface Req extends Request {
  userData: any
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new HttpError("Authentication failed.", 401);
    }
    const decodedToken = jwt.verify(token, JWT_KEY) as jwt.JwtPayload;
    req.userData = {userId: decodedToken.userId}
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed.", 401));
  }
};
