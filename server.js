require("dotenv").config();
const mysql2 = require("mysql2/promise");
const inquirer = require("inquirer");

//connection info for mysql
const connection = mysql2.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employee_contentDB",
});

// console.log(`
//  _____  _____ ____  _    _    _____ _____ _      _____ ____  ____  _____  ____  ____
// /__ __\/  __//  _ \/ \__/ |  /  __//  __// \  /|/  __//  __\/  _ \/__ __\/  _ \/  __\
//   / \  |  \  | / \|| |\/| |  | |  _|  \  | |\ |||  \  |  \/|| / \|  / \  | / \||  \/|
//   | |  |  /_ | | ||| |  | |  | |_//|  /_ | | \|||  /_ |    /| |-||  | |  | \_/||    /  /\
//   \_/  \____\\_/ \|\_/  \_|  \____\\____\\_/  \|\____\\_/\_\\_/ \|  \_/  \____/\_/\_\  \/ `);

//array of questions to build out the tables and data for database
async function questions() {
  const programStartChoice = await inquirer.prompt([
    {
      type: "rawlist",
      name: "beginChoice",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View ALL departments",
        "View ALL roles",
        "View ALL employees",
        "Update employee role",
        "Exit program",
      ],
    },
  ]);
}

//function that is first invoked
function init() {
  console.log("intro ascii goes here\n");
  setTimeout(function () {
    questions();
  }, 3000);
}
init();
