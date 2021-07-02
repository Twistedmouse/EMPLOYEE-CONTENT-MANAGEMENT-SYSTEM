require("dotenv").config();
const connection = require("./src/connection");
const inquirer = require("inquirer");
const tableize = require("console.table");

// array of questions to build out the tables and data for database
async function startInitChoices() {
  const initChoice = await inquirer.prompt([
    {
      type: "rawlist",
      name: "initChoices",
      message: "Select what you would like to access:",
      choices: ["Departments", "Roles", "Employees", "Exit program"],
    },
    {
      when: (initChoice) => initChoice.initChoices === "Departments",
      type: "rawlist",
      name: "departmentsChoices",
      message: "Departments Options:",
      choices: [
        "View ALL departments",
        "Add department",
        "Update department",
        "Remove department",
        "back",
      ],
    },
    {
      when: (initChoice) => initChoice.initChoices === "Roles",
      type: "rawlist",
      name: "rolesChoices",
      message: "Roles Options:",
      choices: [
        "View ALL Roles",
        "Add Role",
        "Update Role",
        "Remove Role",
        "back",
      ],
    },
    {
      when: (initChoice) => initChoice.initChoices === "Employees",
      type: "rawlist",
      name: "EmployeesChoices",
      message: "Employees Options:",
      choices: [
        "View ALL Employees",
        "Add Employee",
        "Update Employee",
        "Remove Employee",
        "back",
      ],
    },
    {
      when: (initChoice) => initChoice.initChoices === "Exit program",
      type: "confirm",
      name: "exitProgram",
      message: "Are you sure you would like to exit?",
    },
  ]);

  switch (initChoice.initChoices) {
    case "exitProgram":
      exitProgram();
      break;
  }

  //Departments switch
  switch (initChoice.departmentsChoices) {
    case "View ALL departments":
      viewAllDepartments();
      break;

    case "Add department":
      addDepartment();
      break;

    case "Update department":
      updateDepartment();
      break;

    case "Remove department":
      removeDepartment();
      break;

    case "back":
      backToStartInitChoices();
      break;
  }
  //Roles switch
  switch (initChoice.rolesChoices) {
    case "View ALL roles":
      viewAllRoles();
      break;

    case "Add role":
      addRole();
      break;

    case "Update role":
      updateRole();
      break;

    case "Remove role":
      removeRole();
      break;

    case "back":
      backToStartInitChoices();
      break;
  }
  //Employees switch
  switch (initChoice.EmployeesChoices) {
    case "View ALL employees":
      viewAllEmployees();
      break;

    case "Add employee":
      addEmployee();
      break;

    case "Update employee":
      updateEmployee();
      break;

    case "Remove employee":
      removeEmployee();
      break;

    case "back":
      backToStartInitChoices();
      break;
  }
}

//
async function questions() {
  const programStartChoice = await inquirer.prompt([
    {
      type: "rawlist",
      name: "beginChoice",
      message: "What would you like to do?",
      choices: [
        "View ALL roles",
        "View ALL employees",

        "Add role",
        "Add employee",
        //add remove for each department role and employee
        "Update/remove employee role",
        "Exit program",
      ],
    },
    {
      when: (programStartChoice) =>
        programStartChoice.beginChoice === "Update/remove employee role",
      type: "list",
      name: "updateChoice",
      message: "Update or remove:",
      choices: ["Update", "Remove"],
    },
  ]);
}

// adds department to db
async function addDepartment() {
  const addDepartmentResponse = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the department you would like to add:",
    },
  ]);
  try {
    connection.query("INSERT INTO departments (department_name) VALUES (?)", [
      addDepartmentResponse.name,
    ]);
    console.log("\n New department added to employee_contentDB \n");
    setTimeout(function () {
      startInitChoices();
    }, 1000);
  } catch (error) {
    console.error(error.message);
  }
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

//make update/remove functions for each catagory

function backToStartInitChoices() {
  return startInitChoices();
}
// exit function
async function exitProgram() {
  if (initChoice.exitProgram === on) {
    connection.end();
  } else {
    return startInitChoices();
  }
}

//function that is first invoked
function init() {
  console.log(
    String.raw`
======================================================================================================
  _____ _    _  ____  _     ____ ___  _ _____ _____     _    _  ____   _    _  ____   _____ _____ ____ 
 /  __// \__/ |/  __\/ \   /  _ \\  \///  __//  __/    / \__/ |/  _ \ / \  / |/  _  \/  __//  __//  __\
 |  \  | |\/| ||  \/|| |   | / \| \  / |  \  |  \      | |\/| || / \ || |\ | || / \| | |  _|  \  |  \/|
 |  /_ | |  | ||  __/| |_/\| \_/| / /  |  /_ |  /_     | |  | || |-| || | \| || |-|| | |_//|  /_ |    /
 \____\\_/  \_|\_/   \____/\____//_/   \____\\____\    \_/  \_|\_/ \_|\_/  \_|\_/  \_|\___\\____\\_/\_\
======================================================================================================
  `
  );
  setTimeout(function () {
    startInitChoices();
  }, 2000);
}
init();
