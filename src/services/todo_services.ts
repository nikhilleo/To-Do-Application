import { NextFunction } from "express";
import Todo_Model, { ToDoAttributes, ToDoInput } from "../models/todo_model";
import User_Model from "../models/user_model";

export const saveToDoToDB = async (data: ToDoInput, next: NextFunction) => {
  try {
    if (!data.title) {
      throw new Error("Title Required");
    }
    const result = await Todo_Model.create(data);
    return result;
  } catch (error: any) {
    next(error);
  }
};

export const findOneToDo = async (
  data: { userID: number; id: number },
  next: NextFunction
) => {
  try {
    if (!data.id) {
      throw new Error("Must Provide ID To Find To Do Item");
    }


    const To_Do_Item = await Todo_Model.findOne({
      where: { UserModelId: data.userID, id: data.id },
      include: [
        {
          model: User_Model,
          //   as: "User",
          attributes: ["fName", "lName", "email"],
        },
      ],
    });
    if (!To_Do_Item) {
      throw new Error("No Todos For User With Given ToDo ID");
    }
    return To_Do_Item;
  } catch (error) {
    next(error);
  }
};

export const findAll = async (
  data: { UserModelId: number },
  next: NextFunction
) => {
  try {
    const allToDos: any = await Todo_Model.findAll({
      where: {
        UserModelId: data.UserModelId,
      },
      attributes: ["title","id"],
      include: [
        {
          model: User_Model,
          // as:"User",
          attributes: ["fName", "lName", "email"],
        },
      ],
    });
    if (allToDos.length < 1) {
      throw new Error("No Todos Found For User");
    } else {
      return allToDos;
    }
  } catch (error) {
    next(error);
  }
};

export const findOneAndUpdate = async (
  data: { id: number; userID: number; title: string },
  next: NextFunction
) => {
  try {
    if (!data.id) {
      throw new Error("No Todo ID Provided");
    }
    if (!data.title) {
      throw new Error("No Update Title Provided");
    }
    if (!data.userID) {
      throw new Error("No Update Title Provided");
    }
    const todo_item: any = await Todo_Model.findOne({
      where: { UserModelId: data.userID, id: data.id },
      include: [
        {
          model: User_Model,
          // as: "User",
          attributes: ["fName", "lName", "email"],
        },
      ],
      attributes: ["id", ["title", "old_title"]],
    });
    if (!todo_item) {
      throw new Error("No Todos For User With Given ToDo ID");
    }
    const updated = await Todo_Model.update(
      { title: data.title },
      { where: { id: todo_item.id } }
    );
    if (!updated) {
      throw new Error("Could Not Update");
    } else {
      return todo_item;
    }
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  data: { id: number; userID: number },
  next: NextFunction
) => {
  try {
    if (!data.id) {
      throw new Error("Provide ID To Delete To Do Item");
    } else {
      const result = await Todo_Model.destroy({
        where: { id: data.id }
      });
      if (!result) {
        throw new Error("No To Do Item Found For Given ID");
      }
      return result;
    }
  } catch (error) {
    next(error);
  }
};
