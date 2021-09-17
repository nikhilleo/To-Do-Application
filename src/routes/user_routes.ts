
import { Router } from "express";
const userRouter = Router();
import { createUser, login, checkAuth } from "../controllers/user_controllers";
import { auth } from "../middlewares/auth";

userRouter.post("/createUser", createUser);

userRouter.post("/loginUser", login);

userRouter.get("/auth", auth, checkAuth);

export default userRouter;
