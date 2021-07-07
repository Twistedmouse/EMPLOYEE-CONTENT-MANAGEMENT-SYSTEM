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

module.exports = add;
