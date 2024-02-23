const con = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "Green@123",
    database: "user_data",
  },
});
