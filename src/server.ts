import express, { NextFunction, Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as dotEnv from "dotenv";
import morgan from "morgan";
import sequelizeConnection from "./db/index";
import Todo_Model from "./models/todo_model";
import User_Model from "./models/user_model";
import todo_routes  from "./routes/todo_routes";
import user_routes from "./routes/user_routes";

dotEnv.config();

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

sequelizeConnection.sync().then((res) => {
  // console.log("Synced");
});

User_Model.sync().then((res) => {
  // console.log("Table Synced");
});

Todo_Model.sync().then((res) => {
  // console.log("Table Synced");
});

User_Model.hasMany(Todo_Model);

Todo_Model.belongsTo(User_Model);

app.use("/",user_routes);

app.use("/todo",todo_routes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello World" });
});

app.use("*", (req:Request, res:Response) => {
  return res.status(404).json({
    success: false,
    message: "API Endpoint Doesn't Exist",
  });
});

app.use(function (err:Error, req:Request, res:Response, next:NextFunction) {
  if (err.message) {
    res.status(400).json({success:false,message:err.message});
  } else {
    res.status(500).json({success:false,message:"Internal Server Error"});
  }
});

const port = process.env.PORT || "8000";

app.listen(port, () => {
  console.log(`Server Started On http://localhost:${port}`);
});

export default app;

// app.listen(port, (): void => {
//     console.log(`Server Running here 👉 https://localhost:${port}`);
// });
