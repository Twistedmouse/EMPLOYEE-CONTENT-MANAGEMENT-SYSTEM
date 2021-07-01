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
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);