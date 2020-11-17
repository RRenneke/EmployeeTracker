//create an instance of mysql and inquirer
const mysql = require("mysql");
const inquirer = require("inquirer");

//create a connection object
const connection = mysql.createConnection({
    //give the object all the details about our database
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootpasswordSMU",
    database: "employeeTrackerDB"
});

//run the connect function so we see it on the console
connection.connect(function (err) {
    if (err) throw err;
    //after its connected run this function to start the search of what the user wants to do
    startSearch();
});

//function to start the promts reflects class activity 14
function startSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "Add a new employee",
                "Add a new role",
                "Add a new department",
                "Update employee role",
            ]
        })
        //swtich cases the it what function to run for each prompt
        .then(function (answer) {
            switch (answer.action) {
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all departments":
                    viewAllDepartments();
                    break;

                case "Add a new employee":
                    addNewEmployee();
                    break;
                case "Add a new role":
                    addNewRole();
                    break;
                case "Add a new department":
                    addNewDepartment();
                    break;

                case "Update employee role":
                    updateEmployeeRole();
                    break;
            }
        })
}
function viewAllEmployees() {
    const query =
 //"SELECT * FROM employee"
        //tutor helped me get fancy to combine the tables but we ran out to time.
        //this was as far as I got
        `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS dept_name, 
        CONCAT(emp.first_name, ' ', emp.last_name) AS manager
        FROM employee e
        LEFT JOIN role r
	    ON e.role_id = r.id
        LEFT JOIN department d
        ON d.id = r.department_id
        LEFT JOIN employee emp
        ON emp.id = e.manager_id`
    //connect to the database and do a console table if there is not an error
    connection.query(query, function (err, res) {
        if (err) throw err;
        //per TA, use console.table to log the results so we don't have to use positioning like in class example
        console.table(res);
        //run the original function to go back to promot list
        startSearch();
    });
}