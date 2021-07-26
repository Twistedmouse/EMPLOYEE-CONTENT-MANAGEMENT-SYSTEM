const inquirer = require("inquirer");
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

module.exports = addDepartment;
