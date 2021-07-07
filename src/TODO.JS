// IMPORTANT: elaborate what to do on each green todo: in more detail.
//            eg what to put into inquirer based on spec
// TODO: :DONE: on start init display ascii title.
// todo: :DONE:with inquirer print ascii title into the console.

// TODO: Build a command-line application that at a minimum allows the user to:
// todo: Add departments, roles, employees
//      NOTE:this would made with inquirer and then apart of the database
//      task: :DONE:Add a department with max characters of (30). NOTE: choosing a manager will choose the department.
//      task: :DONE:Add a role with max characters of (30), salary (decimal), department_id (integer)
//      task: Add employees with first_name and last_name max char(30), role_id (integer), manager_id (integer)
//             IF: manager is chosen
//              THEN: prompt asking from which department.
//              THEN: assign that manager as a manager of that department.
// todo: View departments, roles, employees
//      task: choices: view by - department_id, role_id or employees.
//            output: displays a table in the terminal with chosen data.
// todo: Update employee roles
//      task: WHEN: update is chosen.
//            THEN: each choice of employees is listed.
//            THEN: list role or department.
//            THEN: input the updated information.
//      todo: remove employee (included in update)
//           task: WHEN: remove is selected from the terminal.
//            THEN: employee object is removed from list todo: and db

// TODO: create data base to the spec in mysql.
// todo: :DONE: create db that can be connected to and perform queries
// todo: :DONE:use inquirer to interact with the user via the command line interface
// todo: Use console.table to print MySQL rows to the console.
// todo: have a separate file containing functions for performing specific SQL queries you'll need to use.
//       Could a constructor function or a class be helpful for organizing these?
// NOTE: You will need to perform a variety of SQL JOINS to complete this assignment, and it's recommended you review
//       the week's activities if you need a refresher on this.
// NOTE: You may wish to include a seed.sql file to pre-populate your database. This will make development of individual features much easier.
// NOTE: Focus on getting the basic functionality completed before working on more advanced features.
// NOTE: Review the week's activities for a refresher on MySQL.
// NOTE: Check out SQL Bolt for some extra MySQL help.

// BONUS points if you're able to:
// todo: Update employee managers
// todo: View employees by manager
// todo: Delete departments, roles, and employees
// todo: View the total utilized budget of a department -- ie the combined salaries of all employees in that department
