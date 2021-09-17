import { Dialect } from "sequelize/types";

const db = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "todo_application",
    dialect: "mysql" as Dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};

export default db;