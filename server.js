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
