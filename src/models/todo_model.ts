// import { ModelDefined, Optional } from "sequelize";

// import { DataTypes, Model } from "sequelize";
// import sequelize from "../db";

// interface ToDo extends Model {
//   title: string,
// }

// interface NoteCreationAttributes extends Optional<ToDo,"title" > {};

// const Todo_Model: ModelDefined<ToDo,NoteCreationAttributes> = sequelize.define(
//   "ToDO",
//   {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//     tableName: "ToDo",
//   }
// );

// export default Todo_Model;

import { DataTypes, Model, Optional, WhereOptions } from "sequelize";
import sequelizeConnection from "../db";
import User_Model from "./user_model";

export interface ToDoAttributes {
  id: number;
  title: string;
  UserModelId: number;
}

export interface ToDoInput extends Optional<ToDoAttributes, "id"> {}

// export interface ToDoWhereOptions
//   extends WhereOptions<ToDoAttributes> {}

export interface IFindOptions<T> extends ToDoAttributes {
  where?: WhereOptions<ToDoAttributes> | undefined;
}

// export interface IngredientOuput extends Required<ToDoAttributes> {}

class Todo_Model extends Model<ToDoInput> implements ToDoInput {
  public title!: string;
  public UserModelId!: number;
}

Todo_Model.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserModelId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelizeConnection
  }
);

export default Todo_Model;
