const mysql2 = require("mysql2/promise");

//connection info for mysql
const connection = mysql2.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employee_contentDB",
});

module.exports = connection;
