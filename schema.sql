DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(15,0),
  department_id INT(3) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(3) NOT NULL,
  manager_id INT(10) NULL,
  PRIMARY KEY (id)
);


INSERT INTO department (name)
VALUES("Managment"),("Sales"),("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES
("Manager", 80000, 1),
("Co-Manager", 80000, 1),
("Assitant Regional Manager", 60000, 2),
("Salesman", 60000, 2),
("Head Accountant", 60000, 3),
("Accountant", 50000, 3),
("Office Manager", 40000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Michael", "Scott", 1, NULL),
("Jim", "Halpert", 2, 1),
("Dwight", "Schrute", 3, 1), 
("Stanley","Hudson",4, 1),
("Phyllis", "Smith",4, 1),
("Ryan", "Howard",4, 1),
("Angela", "Martin",5, 1),
("Kevin","Malone",6, 5),
("Oscar","Nunez",6, 5),
("Pam", "Halpert",7, NULL);
