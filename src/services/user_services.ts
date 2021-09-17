import User_Model, { UserAttributes } from "../models/user_model";
import jwt from "jsonwebtoken";
import dot from "dotenv";
import bcrypt from "bcryptjs";
import { NextFunction } from "express";
dot.config();
const jwtKey: string = process.env.JWT_KEY!;

if (!jwtKey) {
  throw new Error("JWT_KEY Not Found");
}

// export const saveUserToDB = async (data: UserAttributes,next:NextFunction) => {
//   try {
//     const result = await User_Model.create(data)
//     // .then((res) => {
//     //   return res;
//     // }).catch((err)=>{
//     //   throw new Error(err.original.code);
//     // });
//
//     return result;
//   } catch (error:any) {
//
//     if(error.original.code == "ER_DUP_ENTRY"){
//       next("Email Already Exist")
//     }
//     next(error);
//   }
// };

export const saveUserToDB = async (
  data: UserAttributes,
  next: NextFunction
) => {
  try {
    const result = await User_Model.create(data);
    return result;
  } catch (error: any) {
    next(error);
  }
};

export const generateAuthToken = async (data: any, next: NextFunction) => {
  try {
    const token = await jwt.sign({ email: data }, jwtKey, { expiresIn: "4h" });
    return token;
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (data: UserAttributes, next: NextFunction) => {
  try {
    const result = await User_Model.findOne({ where: { email: data.email } });
    if (result) {
      const match = await bcrypt.compare(data.password, result.password);
      if (!match) {
        throw new Error("Invalid Credentials");
      }
      return result;
    }
  } catch (error) {
    next(error);
  }
};
