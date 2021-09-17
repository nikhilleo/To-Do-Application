import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User_Model from "../models/user_model";
dotenv.config();

const jwt_key: string = process.env.JWT_KEY!;

export const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Token Required");
    }
    const token = req.headers.authorization?.split(" ")[1] as string;
    // console.log(token);
    const userData: any = await jwt.verify(token, jwt_key);
    // console.log(userData);
    const data = await User_Model.findOne({
      where: { email: userData.email.email },
    });
    if (!data) {
      throw new Error("No User Found");
    } else {
      req.user = data;
      next();
    }
  } catch (error) {
    next(error);
  }
};
