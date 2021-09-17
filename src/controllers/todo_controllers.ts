import { AnyTxtRecord } from "dns";
import { NextFunction, Request, Response } from "express";
import Todo_Model from "../models/todo_model";
import User_Model from "../models/user_model";
import {
  findAll,
  findOneToDo,
  saveToDoToDB,
  findOneAndUpdate,
  deleteOne,
} from "../services/todo_services";

// export const createTodo = async (
//   req: any,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // if (req.body === {}) {
//     //   throw new Error("Title Required");
//     // } else {
//     const data = {
//       title: req.body.title,
//       UserModelId: req.user.id,
//     };
//     const result: any = await saveToDoToDB(data, next);
//     // }
//     res.json({
//       message: "ToDo Item Created",
//       To_Do_Item: {
//         title: result?.title,
//         userID: result.UserModelId,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const createTodo = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // if (req.body === {}) {
    //   throw new Error("Title Required");
    // } else {
    const data = {
      title: req.body.title,
      UserModelId: req.user.id,
    };
    const result: any = await saveToDoToDB(data, next);
    // }
    res.json({
      success:true,
      message: "ToDo Item Created",
      To_Do_Item: {
        id:result?.id,
        title: result?.title,
        userID: result.UserModelId,
      },
    });
  } catch (error) {
    next(error);
  }
};

// where: { UserModelId: req.user.id },
//       include: [
//         {
//           model: UserModelId,
//           as: "User",
//           attributes: ["userName", "email"],
//         },
//       ],

export const findAllTodos = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result: any = await findAll({ UserModelId: req.user.id }, next);
    res.status(200).json({
      succsess: true,
      totalItems: result.length,
      toDos: result,
    });
  } catch (error) {
    next(error);
  }
};

export const findToDoByID = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: { id: number; userID: number } = {
      id: req.params.id,
      userID: req.user.id,
    };
    const result = await findOneToDo(data, next);
    if (result) {
      res.status(200).json({
        succsess: true,
        toDos: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: { id: number; userID: number; title: string } = {
      id: req.params.id,
      userID: req.user.id,
      title: req.body.title,
    };
    const result = await findOneAndUpdate(data, next);
    if (result) {
      res.status(200).json({
        succsess: true,
        message: "Updated ToDo Item",
        toDos: result,
        updateTitle:data.title
      });
    }
  } catch (error) {
    next(error)
  }
};



export const deleteOneController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: { id: number; userID: number; } = {
      id: req.params.id,
      userID: req.user.id,
    };
    const result = await deleteOne(data, next);
    if (result) {
      res.status(200).json({
        succsess: true,
        message: "Delted ToDo Item",
        toDos: result,
      });
    }
  } catch (error) {
    next(error)
  }
};


