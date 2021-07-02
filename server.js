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

    case "Add Role":
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
  const departmentArrayFromDb = await connection.query(
    "SELECT * from departments"
  );
  console.log(departmentArrayFromDb);
  const departmentArray = await departmentArrayFromDb.map((departments) => ({
    name: departments.department_name,
    value: departments.id,
  }));

  const addRoleResponse = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the role you would like to add:",
    },
    {
      type: "input",
      name: "salary",
      message: "Input your salary:",
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does this role belong to:",
      choices: [departmentArray],
    },
  ]);
  try {
    connection.query(
      "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
      [
        addRoleResponse.name,
        addRoleResponse.salary,
        addRoleResponse.department_id,
      ]
    );
    console.log("\n New employee added to employee_contentDB \n");
    setTimeout(function () {
      startInitChoices();
    }, 1000);
  } catch (error) {
    console.error(error.message);
  }
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

//make update/remove functions for each category

function backToStartInitChoices() {
  return startInitChoices();
}
// exit function
function exitProgram() {
  if (initChoice.exitProgram === false) {
    return startInitChoices();
  } else {
    connection.end();
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
