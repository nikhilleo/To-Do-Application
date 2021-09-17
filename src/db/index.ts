import { Sequelize } from "sequelize";
import db from "../config";

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: db.dialect,
    pool: {
        min: db.pool.min,
        max: db.pool.max,
        acquire: db.pool.acquire,
        idle: db.pool.idle
    }
});


export default sequelize;

// import { Sequelize } from "sequelize";

// const sequelizeConnection = new Sequelize(db.DB, db.USER, db.PASSWORD, {
//   host: db.HOST,
//   dialect: db.dialect,
// });

// require("dotenv").config();

// import Todo_Model from "../models/todo_model";
// // import User_Model from "../models/user_model";

// const isDev = process.env.NODE_ENV === "development";

// const dbInit = () => {
//   // User_Model.sync({ alter: isDev })
//   Todo_Model.sync({ alter: isDev });
// };

// export default  sequelizeConnection 
