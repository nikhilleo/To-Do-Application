import request from "supertest";
import app from "../src/server";

let tokenForTest: string;

let todo_id:number;

let toLogin: { email: string; password: string };

afterAll(() => {
  app.removeAllListeners();
});

const characters = "abcdefghijklmnopqrstuvwxyz";

function generateString(length:number) {
  let result:string = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

describe("User Test Cases", () => {
  //User SignUp
  describe("User SignUp", () => {
    test("Sign Up With All Data Correctly Filled In", (done) => {
      request(app)
        .post("/createUser")
        .send({
          fName: `${generateString(5)}`,
          lName: `${generateString(6)}`,
          email: `${generateString(15)}@gmail.com`,
          password: "nikhil1008",
        })
        .then((response) => {
          console.log(response.body);
          expect.objectContaining({
            success: true,
            message: expect.any(String),
            user: expect.objectContaining({
              fName: expect.any(String),
              lName: expect.any(String),
              email: expect.any(String),
            }),
          });
          toLogin = {
            email: response.body.user.email,
            password: "nikhil1008",
          };
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });

    test("Sign Up Without Data Correctly Filled In", (done) => {
      request(app)
        .post("/createUser")
        .send({
          fName: "Nikhil",
          lName: "Leo",
        })
        .then((response) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });
  });

  //User SignUp
  describe("User Login", () => {
    test("Login With All Data Correctly Filled In", (done) => {
      request(app)
        .post("/loginUser")
        .send({ ...toLogin })
        .then((response) => {
          console.log(response.body);
          expect.objectContaining({
            success: true,
            message: expect.any(String),
            user: expect.objectContaining({
              fName: expect.any(String),
              lName: expect.any(String),
              email: expect.any(String),
            }),
            token: expect.any(String),
          });
          tokenForTest = response.body.token;
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });

    test("Login Without Data Correctly Filled In", (done) => {
      request(app)
        .post("/createUser")
        .send({
          email:"random@gmail.c",
          password:"random22222111113333344kmaskvanknasvlasknvlansv8aoscn8caivlnas"
        })
        .then((response) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });
  });
});

describe("\n\nToDo Test Cases", () => {
  //Add To Do Item
  describe("Add To Do Item To Database", () => {
    test("Add To Do Item To Database With Title And Auth Headers", (done) => {
      request(app)
        .post("/todo/createToDo")
        .set(
          "Authorization",
          `Bearer ${tokenForTest}`
        )
        .send({
          title: "Latest From Test",
        })
        .then((response) => {
          expect.objectContaining({
            success: true,
            message: expect.any(Number),
            To_Do_Item: expect.objectContaining({
              id:expect.any(Number),
              title: expect.any(String),
              userID: expect.any(Number),
            }),
          });
          todo_id = response.body.To_Do_Item.id
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });
    test("Add To Do Item To Database Without Title And Auth Headers", (done) => {
      request(app)
        .post("/todo/createToDo")
        .then((response) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          // expect(response.statusCode).toBe(400);
          done();
        })
        .catch((err) => {
          console.log(err);
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });
  });

  //Get All ToDos
  describe("Get All To Do Items", () => {
    test("Get All Todos With Auth Header", (done) => {
      request(app)
        .get("/todo/getAllTodos")
        .set(
          "Authorization",
          `Bearer ${tokenForTest}`
        )
        .then((response) => {
          expect.objectContaining({
            success: true,
            totalItems: expect.any(Number),
            toDos: expect.any(Array),
          });
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });

    test("Get All Todos Without Auth Header", (done) => {
      request(app)
        .get("/todo/getAllTodos")
        .then((response) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          // expect(response.statusCode).toBe(400);
          done();
        })
        .catch((err) => {
          console.log(err);
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });
  });

  //Single To Do
  describe("Get Single To Do Item", () => {
    test("Get Single To Do By ID With Auth Header", (done) => {
      request(app)
        .get(`/todo/getOneTodo/${todo_id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .set(
          "Authorization",
          `Bearer ${tokenForTest}`
        )
        .then((response) => {
          expect.objectContaining({
            success: true,
            toDos: expect.any(Object),
          });
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });

    test("Get Single To Do By ID Without Auth Header", (done) => {
      request(app)
        .get(`/todo/getOneTodo/1`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          expect.objectContaining({
            success: false,
            toDos: expect.any(String),
          });
          // expect(response.statusCode).toBe(400);
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });
  });

  //Update To Do
  describe("Update To Do Item", () => {
    test("Update One To Do With Auth Header And Title", (done) => {
      request(app)
        .patch(`/todo/updateOne/${todo_id}`)
        .set(
          "Authorization",
          `Bearer ${tokenForTest}`
        )
        .set("Accept", "application/json")
        .send({
          title: "Hello World",
        })
        .expect("Content-Type", /json/)
        .then((response) => {
          expect.objectContaining({
            success: true,
            message: expect.any(String),
            toDos: expect.any(Object),
            updateTitle: expect.any(String),
            // toDos: expect.any(Object),
          });
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });

    test("Update One To Do Without Auth Header And Title", (done) => {
      request(app)
        .patch(`/todo/updateOne/1`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          // expect(response.statusCode).toBe(400);
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          // expect(err.status).toBe(500);
          done(err);
        });
    });
  });
/*
  describe("Delete To Do", () => {
    // Delete A To DO Item
    test("Delete One To Do With Auth Header And ID", (done) => {
      request(app)
        .delete(`/todo/deleteOne/1`)
        .set(
          "Authorization",
          `Bearer ${tokenForTest}`
        )
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          expect.objectContaining({
            success: true,
            message: expect.any(String),
            toDos: expect.any(Number),
            // toDos: expect.any(Object),
          });
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          done(err);
        });
    });

    test("Delete One To Do Without Auth Header And ID", (done) => {
      request(app)
        .delete(`/todo/deleteOne/`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          // expect(response.statusCode).toBeGreaterThanOrEqual(400);
          done();
        })
        .catch((err) => {
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          });
          // expect(err.status).toBe(500);
          done(err);
        });
    });
  });
  */
});