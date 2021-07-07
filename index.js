require("dotenv").config();
const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const tableize = require("console.table");
const util = require("util");

//db connection
let connection = mysql2.createConnection({
  host: "localhost",

  port: 3306,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// connects to the connection and makes connection.query work as a promise
connection.connect();
connection.query = util.promisify(connection.query);

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
      when: (answers) => answers.initChoices === "Departments",
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
      when: (answers) => answers.initChoices === "Roles",
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
      when: (answers) => answers.initChoices === "Employees",
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
  ]);

  if (initChoice.initChoices === "Exit program") {
    exitProgram();
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
      startInitChoices();
      break;
    default:
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
      startInitChoices();
      break;
    default:
      break;
  }
  //Employees switch
  switch (initChoice.EmployeesChoices) {
    case "View ALL employees":
      viewAllEmployees();
      break;

    case "Add Employee":
      addEmployee();
      break;

    case "Update employee":
      updateEmployee();
      break;

    case "Remove employee":
      removeEmployee();
      break;

    case "back":
      startInitChoices();
      break;
    default:
      break;
  }
}

// adds department to db
async function addDepartment() {
  try {
    const addDepartmentResponse = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department you would like to add:",
      },
    ]);

    const query = await connection.query(
      "INSERT INTO departments (department_name) VALUES (?)",
      [addDepartmentResponse.name]
    );

    console.log(
      "\n ------- New department added to employee_contentDB ------- \n"
    );
    setTimeout(function () {
      startInitChoices();
    }, 1000);
  } catch (error) {
    console.error(error.message);
  }
}

// add/insert functions
async function addRole() {
  try {
    let departmentArrayFromDb = await connection.query(
      "SELECT * from departments"
    );

    let departmentArray = await departmentArrayFromDb.map((departments) => ({
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
        choices: departmentArray,
      },
    ]);

    const query = await connection.query(
      "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
      [
        addRoleResponse.name,
        addRoleResponse.salary,
        addRoleResponse.department_id,
      ]
    );
    console.log("\n ------- New role added to employee_contentDB -------\n");
    setTimeout(function () {
      startInitChoices();
    }, 1000);
  } catch (error) {
    console.error(error.message);
  }
}

async function addEmployee() {
  try {
    const rolesArrayFromDb = await connection.query("SELECT * FROM roles");
    const rolesArray = rolesArrayFromDb.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    // const employeeArrayFromDb = await connection.query("SELECT * FROM roles");
    // const employeeArray = employeeArrayFromDb.map((role) => ({ role.manager_id }));

    const addEmployeeRequest = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the first name of the employee you would like to add:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the last name of the employee you would like to add:",
      },
      {
        type: "list",
        name: "role_id",
        message: "Pease select this employees role:",
        choices: rolesArray,
      },
      // {
      //are you the manager/ who is the employees manager prompt?
      //if true make role_id manager_id if false make null
      // },
    ]);
    console.log(addEmployeeRequest);
    const query = await connection.query(
      "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
      [
        addEmployeeRequest.first_name,
        addEmployeeRequest.last_name,
        addEmployeeRequest.role_id,
        addEmployeeRequest.manager_id,
      ]
    );
    console.log(
      "\n ------- New employee added to employee_contentDB ------- \n"
    );
    setTimeout(function () {
      startInitChoices();
    }, 1000);
  } catch (error) {
    console.error(error.message);
  }
}

// View functions
async function viewAllEmployees() {}

async function viewAllRoles() {}

async function viewAllEmployees() {}

//make update/remove functions for each category below

// exit function
function exitProgram() {
  connection.end();
  process.exit();
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
