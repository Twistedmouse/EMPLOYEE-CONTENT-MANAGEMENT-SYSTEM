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

    case "Update/remove employee role":
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
      message: "Enter the name of the department you would like to add:",
    },
  ]);
  // connection.query(INSERT INTO)
}

// add/insert functions
async function addRole() {
  const addRoleResponse = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the role you would like to add:",
    },
  ]);
}

async function addEmployee() {
  const addEmployeeRequest = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the employee you would like to add:",
    },
  ]);
}

// View functions
async function viewAllEmployees() {}

async function viewAllRoles() {}

async function viewAllEmployees() {}

// employee update function
async function updateEmployeeRole() {}

// exit function
async function exitProgram() {}

//function that is first invoked
function init() {
  console.log(
    String.raw`
====================================================================================================
 _____ _    _  ____  _     ____ ___  _ _____ _____     _    _  ____  _      ____  _____ _____ ____ 
/  __// \__/ |/  __\/ \   /  _ \\  \///  __//  __/    / \__/ |/  _ \/ \  /|/  _ \/  __//  __//  __\
|  \  | |\/| ||  \/|| |   | / \| \  / |  \  |  \      | |\/| || / \|| |\ ||| / \|| |  _|  \  |  \/|
|  /_ | |  | ||  __/| |_/\| \_/| / /  |  /_ |  /_     | |  | || |-||| | \||| |-||| |_//|  /_ |    /
\____\\_/  \_|\_/   \____/\____//_/   \____\\____\    \_/  \ |\_/ \|\_/  \|\_/ \|\____\\____\\_/\_\
====================================================================================================
  `
  );
  setTimeout(function () {
    questions();
  }, 3000);
}
init();
