const express = require("express");
const cors = require("cors");
const app = express();
const mysql2 = require("mysql2");

app.use(cors());
app.use(express.json());

const con = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "Green@123",
    database: "user_data",
  },
});
// con
//   .from("login_data")
//   .select("*")
//   .then((rows) => {
//     for (row of rows) {
//       console.log(
//         `${row["id"]} ${row["email"]} ${row["first"]} ${row["last"]} ${row["password"]}`
//       );
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     con.destroy();
//   });
app.post("/Login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  con
    .from("login_data")
    .select("password", "email")
    .where("email", email)

    .then((rows) => {
      console.log(rows[0]);
      if (rows[0] === undefined) {
        res.json({ message: "incorrect email and passowrd" });
      }
      if (rows[0].password !== password && rows[0].email === email) {
        res.json({ message: "wrong password" });
      }
      if (rows[0].password === password && rows[0].email === email) {
        res.json({ message: "false" });
      } else {
        res.json({ message: "incorrect username and password" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
app.put("/Forgot", (req, res) => {
  email = req.body.email;
  password = req.body.password;
  con
    .from("login_data")
    .select("email")
    .where("email", email)

    .then((rows) => {
      console.log(rows[0]);
      if (rows[0] !== undefined) {
        con("login_data")
          .where("email", "=", email)
          .update({ password: password })
          .then(() => res.json({ message: "true" }))
          .catch((err) => {
            console.log(err);
            throw err;
          });
      } else {
        res.json({ message: "false" });
      }
    });
});
app.post("/Register", (req, res) => {
  let data = [
    {
      email: req.body.email,
      first: req.body.first,
      last: req.body.last,
      password: req.body.password,
    },
  ];

  con
    .from("login_data")
    .select("email")
    .where("email", req.body.email)
    .then((rows) => {
      if (rows[0] === undefined) {
        con("login_data")
          .insert(data)
          .then(() => res.json({ message: "successful" }));
      } else {
        res.json({ message: "failed" });
      }
    });
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
