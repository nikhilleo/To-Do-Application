// import { DataTypes } from "sequelize";
// import sequelize from "../db";
// import * as bcrypt from 'bcryptjs'
// import { Model } from "sequelize";

// interface User extends Model {
//     fName: string,
//     lName: string,
//     email: string,
//     password: string,
// }

// const User_Model = sequelize.define<User>("User", {
//     fName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     }

// }, {
//     timestamps: true,
//     tableName: "User",
// })

// User_Model.addHook("beforeSave", async (user: User) => {
//     if (user.password) {
//         user.password = await bcrypt.hashSync(user.password, 14);
//     }
// })

// User_Model.afterFind((user) => {
// })

// export default User_Model;

import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelizeConnection from "../db";
import bcrypt from "bcryptjs";

export interface UserAttributes {
  fName: string;
  lName: string;
  email: string;
  password: string;
}

export interface UserInput extends Optional<UserAttributes, "fName"> {}

// export interface IngredientOuput extends Required<UserAttributes> {}

class User_Model
  extends Model<UserAttributes, UserInput>
  implements UserAttributes
{
  public fName!: string;
  public lName!: string;
  public email!: string;
  public password!: string;
}

User_Model.init(
  {
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
  }
);

// User_Model.beforeSave("hashPassword",async (user)=>{
//   if(user.password){
//     await bcrypt.hash(user.password,14);
//   }
// })

User_Model.beforeCreate(async (user: any, options: any) => {
  if (user.password) {
    const hashed = await bcrypt.hash(user.password, 14);
    user.password = hashed;
  }
});

User_Model;

export default User_Model;
