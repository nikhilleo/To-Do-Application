import { NextFunction, Request, Response } from "express";
import {
  saveUserToDB,
  generateAuthToken,
  loginUser,
} from "../services/user_services";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await saveUserToDB(req.body, next);
    // generateAuthToken(req.body.email, next)
    //   .then((token) => {
    //     res.json({
    //       message: "User Created",
    //       user: result,
    //       token,
    //     });
    //   })
    //   .catch((err) => {
    //     throw new Error(err);
    //   });
    if (result) {
      const token = await generateAuthToken(req.body, next);
      if (token) {
        res.json({
          success:true,
          message: "User Created",
          user: {
            fName: result?.fName,
            lName: result?.lName,
            email: result?.email,
          },
          token,
        });
      } else {
        throw new Error("Something Went Wrong");
      }
    }
    return;
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await loginUser(req.body, next);
    // generateAuthToken(req.body.email, next)
    //   .then((token) => {
    //
    //     res.json({
    //       message: "Login Successfull",
    //       user: {
    //           id:result?.id,
    //           fName:result?.fName,
    //           lName:result?.lName,
    //           email:result?.email
    //       },
    //       token,
    //     });
    //   })
    //   .catch((err) => {
    //     throw new Error(err);
    //   });
    const token = await generateAuthToken(req.body, next);
    if (token) {
      res.json({
        success:true,
        message: "Login Successfull",
        user: {
          fName: result?.fName,
          lName: result?.lName,
          email: result?.email,
        },
        token,
      });
    } else {
      throw new Error("Something Went Wrong");
    }
  } catch (error) {
    next(error);
  }
};

export const checkAuth = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user!) {
      throw new Error("No User Found");
    }
    res.json({
      success: true,
      user: {
        fName: req.user?.fName,
        lName: req.user?.lName,
        email: req.user?.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
