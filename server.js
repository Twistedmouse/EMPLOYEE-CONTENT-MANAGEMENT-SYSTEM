require("dotenv").config();
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");

// IMPORTANT: elaberate what to do on each green todo: in more detail
//            eg what to put into inquirer based on spec
// TODO: Build a command-line application that at a minimum allows the user to:
// todo: Add departments, roles, employees
// todo: View departments, roles, employees
// todo: Update employee roles
// TODO: create data base to the spec in mysql.
// todo: create db that can be connected to and perform queries
// todo: use inquirer to interact with the user via the command line interface
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
