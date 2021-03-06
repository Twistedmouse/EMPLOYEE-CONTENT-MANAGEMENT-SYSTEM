const mysql2 = require("mysql2");
//db connection
connection = mysql2.createConnection({
  host: "localhost",

  port: 3306,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = connection;
