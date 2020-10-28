DROP DATABASE IF EXISTS companyData_db;
CREATE database companyData_db;

USE companyData_db;

CREATE TABLE Department (
     id INT AUTO_INCREMENT NOT NULL,
     name VARCHAR(30)
);

CREATE TABLE Role (
    id INT NOT NULL,
    title VARCHAR(80),
    salary DECIMAL(10,4) NULL,
    department_id INT,
     PRIMARY KEY(id)
);

CREATE TABLE Employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30), 
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id)
);


INSERT INTO Department (id, name)
VALUES(1, "Managment"),(2, "Sales"),(3, "Accounting"),(4, "Warehouse");

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES
("Michael", "Scott", 1, NULL),("Jim", "Halpert", 2, 1),("Pam", "Halpert",9, 1),("Dwight", "Schrute", 3, 1), ("Stanley","Hudson",4, 1),("Phyllis" "Smith",4, 1),("Angela", "Martin",5, 1),("Kevin","Malone",6, 5),("Oscar","Nunez",6, 5),("Ryan", "Howard",8, 1);

INSERT INTO Role (id, title, salary, department_id)
VALUES
(1, "Manager", 110000, 1),(2, "Co-Manager", 100000, 1),(3, "Assitant to the Regional Manager", 90000, 2),(4, "Salesman", 60000, 2),(5, "Head Accountant", 60000, 3),(6, "Accountant", 50000, 3),(7, "Warehouse Lead", 40000, 4),(8, "Intern", 30000, 2),(9, "Office Manager", 40000, 1);


CREATE VIEW Employee_publictest AS
SELECT first_name, last_name 
FROM Employee

CREATE VIEW Employee_data AS
SELECT * FROM Employee INNER JOIN Role 
ON Employee.role_id = Role.id_r
;



-- All Query
SELECT first_name, last_name, title, salary FROM Employee INNER JOIN Role 
ON Employee.role_id = Role.id;

--

CREATE VIEW Employee_data AS
SELECT * FROM Employee INNER JOIN Role 
ON Employee.role_id = Role.id_r
;

CREATE VIEW EmployeeName AS
SELECT id, first_name, last_name FROM Employee 
;
SELECT * FROM EmployeeName;

--
CREATE VIEW Employee_public AS
SELECT first_name,last_name, title, salary, department FROM Employee_data INNER JOIN department 
ON Employee_data.department_id = department.id_d;

--Manager View
CREATE VIEW view_manager AS
SELECT Employee_data.id, Employee_data.first_name,Employee_data.last_name, 
concat(EmployeeName.first_name, ' ', EmployeeName.last_name) AS 'Manager'
FROM Employee_data INNER JOIN EmployeeName ON Employee_data.manager_id = EmployeeName.id;

