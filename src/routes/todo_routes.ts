import { Router } from "express";
const router = Router();
import {
  createTodo,
  deleteOneController,
  findAllTodos,
  findToDoByID,
  updateOne,
} from "../controllers/todo_controllers";
import { auth } from "../middlewares/auth";

router.post("/createToDo", auth, createTodo);

router.get("/getAllTodos", auth, findAllTodos);

router.get("/getOneTodo/:id", auth, findToDoByID);

router.patch("/updateOne/:id", auth, updateOne);

router.delete("/deleteOne/:id", auth, deleteOneController);

// router.post("/createTodo",createTodo);

export default router;
