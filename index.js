require("dotenv").config();
const inquirer = require("inquirer");
const util = require("util");
const connection = require("./config/connection");

// connects to the connection and makes connection.query work as a promise=================================
connection.connect();
connection.query = util.promisify(connection.query);

// array of questions to build out the tables and data for database========================================
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
        // "Update Role",
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

  //Departments switch===================================================================================
  switch (initChoice.departmentsChoices) {
    case "View ALL departments":
      viewAllDepartments();
      break;

    case "Add department":
      addDepartment();
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
  //Roles switch========================================================================================
  switch (initChoice.rolesChoices) {
    case "View ALL Roles":
      viewAllRoles();
      break;

    case "Add Role":
      addRole();
      break;

    // case "Update Role":
    //   updateEmployeeRole();
    //   break;

    case "Remove Role":
      removeRole();
      break;

    case "back":
      startInitChoices();
      break;
    default:
      break;
  }
  //Employees switch=======================================================================================
  switch (initChoice.EmployeesChoices) {
    case "View ALL Employees":
      viewAllEmployees();
      break;

    case "Add Employee":
      addEmployee();
      break;

    case "Update Employee":
      updateEmployeeRole();
      break;

    case "Remove Employee":
      removeEmployee();
      break;

    case "back":
      startInitChoices();
      break;
    default:
      break;
  }
}

// adds department to db=====================================================================================
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

// add/insert role to db=====================================================================================
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

// add an employee to the db================================================================================
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
      // { IMPORTANTTODO:
      //are you the manager/ who is the employees manager prompt?
      //if true make role_id manager_id if false make null try list:choices:manger? not manager?
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

// View departments db data in table format ======================================================================
function viewAllDepartments() {
  connection.query("SELECT * FROM departments", (error, res) => {
    if (error) console.error(error);
    console.log("\nDEPARTMENTS TABLE:");
    console.table(res);
    console.log("\n");
    setTimeout(function () {
      startInitChoices();
    }, 1000);
  });
}

// view roles db data in a table format=======================================================================
function viewAllRoles() {
  connection.query("SELECT * FROM roles", (error, res) => {
    if (error) console.error(error);
    console.log("\nROLES TABLE:");
    console.table(res);
    console.log("\n");
    setTimeout(function () {
      startInitChoices();
    }, 1000);
  });
}
// view employees db data in a table format===================================================================
//IMPORTANTTODO: started mysql join getting syntax error come back later for now use console.table
// async function viewAllEmployees() {
//   await connection.query(
//     "SELECT employees.role_id FROM employees INNER JOIN roles ON roles.title=employees.role_id",
//     (error, res) => {
//       if (error) console.log(error);

//       console.log("\nEMPLOYEES TABLE:");
//       console.table(res);
//       console.log("\n");
//       setTimeout(function () {
//         startInitChoices();
//       }, 1000);
//     }
//   );
// }
function viewAllEmployees() {
  connection.query("SELECT * FROM employees", (error, res) => {
    if (error) console.log(error);
    console.log("\nEMPLOYEES TABLE:");
    console.table(res);
    console.log("\n");
    setTimeout(function () {
      startInitChoices();
    }, 1000);
  });
}

//update function=======================================================
async function updateEmployeeRole() {
  //employee data for update:
  const employeesFromDb = await connection.query("SELECT * FROM employees");
  const employeesTableArray = employeesFromDb.map((employees) => ({
    name: `${employees.first_name} ${employees.last_name}`,
    value: employees.id,
  }));
  //roles data for update:
  const rolesData = await connection.query("SELECT * FROM roles");
  const rolesTableArray = rolesData.map((roles) => ({
    name: roles.title,
    value: roles.id,
  }));
  const whichRoleToUpdate = await inquirer.prompt([
    {
      type: "list",
      name: "chooseEmployeeToUpdate",
      message: "Select an employee to update:",
      choices: employeesTableArray,
    },
    {
      type: "list",
      name: "chooseRoleToUpdate",
      message: "Select new role:",
      choices: rolesTableArray,
    },
  ]);
  connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [
    whichRoleToUpdate.chooseRoleToUpdate,
    whichRoleToUpdate.chooseEmployeeToUpdate,
  ]);
  console.log(
    `\n================ Role successfully change. ================  `
  );
  setTimeout(function () {
    startInitChoices();
  }, 1000);
}

// remove functions ==========================================================================================
async function removeDepartment() {
  const DepartmentsData = await connection.query("SELECT * FROM departments");
  const departmentsTableArray = DepartmentsData.map((departments) => ({
    name: departments.department_name,
    value: departments.id,
  }));
  await inquirer
    .prompt([
      {
        type: "list",
        name: "removeDepartmentItem",
        message: "Select the department you would like to remove:",
        choices: departmentsTableArray,
      },
    ])
    .then(async (selection) => {
      await connection.query(
        `DELETE FROM departments WHERE id=${selection.removeDepartmentItem}`
      );
      console.log(
        `\n================== Item has been removed from departments. ==================`
      );
      setTimeout(function () {
        viewAllDepartments();
      }, 1000);
    });
}

async function removeRole() {
  const rolesData = await connection.query("SELECT * FROM roles");
  const rolesTableArray = rolesData.map((roles) => ({
    name: roles.title,
    value: roles.id,
  }));
  await inquirer
    .prompt([
      {
        type: "list",
        name: "removeRoleItem",
        message: "Select the role you would like to remove:",
        choices: rolesTableArray,
      },
    ])
    .then(async (selection) => {
      await connection.query(
        `DELETE FROM roles WHERE id=${selection.removeRoleItem}`
      );
      console.log(
        `\n================== Item has been removed from roles. ==================`
      );
      setTimeout(function () {
        viewAllRoles();
      }, 1000);
    });
}
async function removeEmployee() {
  const employeesData = await connection.query("SELECT * FROM employees");
  const employeesTableArray = employeesData.map((employees) => ({
    name: `${employees.first_name} ${employees.last_name}`,
    value: employees.id,
  }));
  await inquirer
    .prompt([
      {
        type: "list",
        name: "removeEmployeeItem",
        message: "Select the role you would like to remove:",
        choices: employeesTableArray,
      },
    ])
    .then(async (selection) => {
      await connection.query(
        `DELETE FROM employees WHERE id=${selection.removeEmployeeItem}`
      );
      console.log(
        `\n================== Item has been removed from employees. ==================`
      );
      setTimeout(function () {
        viewAllEmployees();
      }, 1000);
    });
}

// exit function =============================================================================================
function exitProgram() {
  console.log(
    "========================.PROGRAM CLOSED.========================"
  );
  connection.end();
  process.exit();
}

//function that is first invoked =============================================================================
function init() {
  console.log(
    String.raw`
=======================================================================================================
  _____ _    _  ____  _     ____ ___  _ _____ _____     _    _  ____   _    _  ____  _____ _____ ____ 
 /  __// \__/ |/  __\/ \   /  _ \\  \///  __//  __/    / \__/ |/  _ \ / \  / |/  _ \/  __//  __//  __\
 |  \  | |\/| ||  \/|| |   | / \| \  / |  \  |  \      | |\/| || / \ || |\ | || / \ | |  _|  \  |  \/|
 |  /_ | |  | ||  __/| |_/\| \_/| / /  |  /_ |  /_     | |  | || |-| || | \| || |-| | |_//|  /_ |    /
 \____\\_/  \_|\_/   \____/\____//_/   \____\\____\    \_/  \_|\_/ \_|\_/  \_|\_/ \_|\___\\____\\_/\_\
=======================================================================================================
  `
  );
  setTimeout(function () {
    startInitChoices();
  }, 2000);
}
init();
