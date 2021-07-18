DROP DATABASE IF EXISTS employee_contentDB;
CREATE DATABASE employee_contentDB;
USE employee_contentDB;
CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(12, 2),
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);
CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);
-- department COLUMNs ------------------------------------------
INSERT INTO
  departments(department_name)
VALUES
  ("Sales"),("Legal"),("Finance"),("Engineering");
-- roles COLUMNs -----------------------------------------------
INSERT INTO
  roles(title, salary, department_id)
VALUES
  ("Sales Lead", 50000, 1);
INSERT INTO
  roles(title, salary, department_id)
VALUES("Sales Rep", 40000, 1);
INSERT INTO
  roles(title, salary, department_id)
VALUES("Head Lawyer", 120000, 2);
INSERT INTO
  roles(title, salary, department_id)
VALUES
  ("Lawyer", 80000, 2);
INSERT INTO
  roles(title, salary, department_id)
VALUES("Lead Accountant", 100000, 3);
INSERT INTO
  roles(title, salary, department_id)
VALUES
  ("Accountant", 70000, 3);
INSERT INTO
  roles(title, salary, department_id)
VALUES
  ("Lead Engineer", 100000, 4);
INSERT INTO
  roles(title, salary, department_id)
VALUES
  ("Engineer", 80000, 4);
-- employees COLUMNs ------------------------------------------
  -- manager emplyee is actually a way to choose an emplyee as a manager may remove oon final release
INSERT INTO
  employees(first_name, last_name, role_id, manager_id)
VALUES
  ("Ben", "John", 1, null);
INSERT INTO
  employees(first_name, last_name, role_id, manager_id)
VALUES
  ("Sarah", "Doe", 2, null);
INSERT INTO
  employees(first_name, last_name, role_id, manager_id)
VALUES
  ("Jake", "Anderson", 3, null);
INSERT INTO
  employees(first_name, last_name, role_id, manager_id)
VALUES
  ("Bill", "Ted", 4, null);
INSERT INTO
  employees(first_name, last_name, role_id, manager_id)
VALUES
  ("Hank", "Joans", 4, 4);