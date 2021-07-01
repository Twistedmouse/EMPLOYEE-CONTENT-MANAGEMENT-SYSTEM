CREATE DATABASE employee_contentDB;
USE employee_contentDB;
INSERT INTO
  departments (department_name);
VALUES
  ("Sales"),("Legal"),("Finance"),("Engineering");
INSERT INTO
  roles (title, salary, department_id);
VALUES
  ("Manager", 100000, 0);
INSERT INTO
  roles (title, salary, department_id)
VALUES
  ("Sales Lead", 50000, 1);
INSERT INTO
  roles (title, salary, department_id)
VALUES
  ("Lawyer", 80000, 2);
INSERT INTO
  roles (title, salary, department_id)
VALUES
  ("Accountant", 70000, 3);
INSERT INTO
  roles (title, salary, department_id)
VALUES
  ("Engineer", 80000, 4);
INSERT INTO
  employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Ben", "John", 1, 1);
INSERT INTO
  employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Sarah", "Doe", 2, 2);
INSERT INTO
  employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Jake", "Anderson", 3, 3);
INSERT INTO
  employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Bill", "Ted", 4, 4);
INSERT INTO
  employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Hank", "Joans", 5, 5);