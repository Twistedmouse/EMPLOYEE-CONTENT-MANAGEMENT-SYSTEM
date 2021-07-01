require("dotenv").config();
const connection = require("connection");
const inquirer = require("inquirer");

//array of questions to build out the tables and data for database
async function questions() {
  const programStartChoice = await inquirer.prompt([
    {
      type: "rawlist",
      name: "beginChoice",
      message: "What would you like to do?",
      choices: [
        "View ALL departments",
        "View ALL roles",
        "View ALL employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee role",
        "Exit program",
      ],
    },
  ]);

  // switch for what each choice in the beginChoice array will invoke
  switch (programStartChoice.beginChoice) {
    case "View ALL departments":
      viewAllDepartments();
      break;

    case "View ALL employees":
      viewAllEmployees();
      break;

    case "View ALL roles":
      viewAllRoles();
      break;

    case "Add department":
      addDepartment();
      break;

    case "Add role":
      addRole();
      break;

    case "Add employee":
      addEmployee();
      break;

    case "Update employee role":
      updateEmployeeRole();
      break;

    case "Exit program":
      exitProgram();
      break;
  }
}

async function addDepartment() {
  const addDepartmentResponse = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Name of the department you would like to add:",
    },
  ]);
  connection.query(INSERT INTO)
}

async function addRole() {
  const addRoleResponse = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the role you would like to add:",
    },
  ]);
}

//function that is first invoked
function init() {
  console.log(
    String.raw`
       _____  _____ ____  _    _    _____ _____ _      _____ ____  ____  _____  ____  ____
      /__ __\/  __//  _ \/ \__/ |  /  __//  __// \  /|/  __//  __\/  _ \/__ __\/  _ \/  __\
        / \  |  \  | / \|| |\/| |  | |  _|  \  | |\ |||  \  |  \/|| / \|  / \  | / \||  \/|
        | |  |  /_ | | ||| |  | |  | |_//|  /_ | | \|||  /_ |    /| |-||  | |  | \_/||    /  /\
        \_/  \____\\_/ \|\_/  \_|  \____||____\\_/  \|\____\\_/\_\\_/ \|  \_/  \____/\_/\_\  \/ `
  );
  setTimeout(function () {
    questions();
  }, 3000);
}
init();
