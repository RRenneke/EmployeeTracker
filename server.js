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
function viewAllRoles() {
    const query =
        //select all from the roles table. Nothing fancy. 
        "SELECT * FROM role"
    //connect to the database and do a console table if there is not an error
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        //run the original function to go back to promot list
        startSearch();
    });
}

function viewAllDepartments() {
    //inquierer is not needed since we are not asking it to do anything like with promots and updates
    const query =
        "SELECT * FROM department"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startSearch();
    });
}

function addNewEmployee() {
    //connect to the database. Then select all from the roles tables
    connection.query(`SELECT * FROM role`, function (err, res) {
        if (err) throw err;
        console.log(res)
        //promot inquirer
        inquirer
            .prompt([
                {
                    //name of column
                    name: "first_name",
                    //input since we are asking the user for it
                    type: "input",
                    //the message we want the user to see
                    message: "What is the employee's first name?"
                },
                {
                    //second data point
                    name: "last_name",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    //last datapoint
                    name: "title",
                    //rawlist and function so the user chooses from the current list of job titles
                    type: "rawlist",
                    message: "What is the employee's title?",
                    //choices function in class activty 10
                    //push the response title to the array
                    choices: function () {
                        var titleArray = [];
                        for (var i = 0; i < res.length; i++) {
                            titleArray.push(res[i].title);
                        }
                        return titleArray;
                    }
                }
            ])
            // when finished prompting, get the answer/response for title
            .then(function (answer) {
                var title = answer.title;
                for (var i = 0; i < res.length; i++) {
                    //https://www.w3schools.com/js/js_switch.asp
                    switch (title) {
                        case res[i].title:
                            title = i + 1;
                            break;
                    }
                }
                //use the questionmark for a place holder
                const query = `INSERT INTO employee SET ?`;
                //we will replace the question mark with this object (contains keys and values) the user provided
                connection.query(query,
                    //query for the three responses
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: title
                    },
                    //print them to the table
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        startSearch();
                    }
                )
            })
    })
}
function addNewRole() {
    connection.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.log(res)
        inquirer
            .prompt([
                {
                    name: "roleName",
                    type: "input",
                    message: "What is the name of the new role?"
                },
                {
                    name: "roleSalary",
                    type: "input",
                    message: "What is the salary of the new role?"
                },
                {
                    name: "department",
                    type: "rawlist",
                    message: "What department is the role in?",
                    choices: function () {
                        var deptArr = [];
                        for (var i = 0; i < res.length; i++) {
                            deptArr.push(res[i].name);
                        }
                        return deptArr;
                    }
                }
            ]).then(function (answer) {
                var userDPT = answer.department;
                for (let i = 0; i < res.length; i++) {
                    switch (userDPT) {
                        case res[i].name:
                            console.log(res[i].name)
                            userDPT = i + 1;
                            break;
                    }
                }

                let query = `INSERT INTO role SET ?`;
                connection.query(query,
                    {
                        title: answer.roleName,
                        salary: answer.roleSalary,
                        department_id: userDPT
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        startSearch();
                    }
                )
            })
    })
}

function addNewDepartment() {
    const query = "SELECT id, name FROM department";
    connection.query(query, function (err, res) {
        console.log(res)
    })

    connection.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.log(res)
        inquirer
            .prompt([
                {
                    name: "name",
                    type: "input",
                    message: "What is the name of the new department?"
                }
            ])
            .then(function (answer) {
                console.log(answer.title)

                const query = `INSERT INTO department SET ?`;
                connection.query(query,
                    {
                        name: answer.name
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        startSearch();
                    }
                )
            })
    })
}
//tried to use update project from class activity 9 but could not get it to work
function updateEmployeeRole() 
{
    connection.query("SELECT employee.last_name FROM employee", function(err, res) 
        {
        if (err) throw err;
        inquirer
            .prompt
            ([{
                //get from the user the employee that needs to be updated based on the current list of employees
                    name: "eName",
                    type: "rawlist",
                    message: "Which employee needs to be updated?",
                    choices: function () 
                    {
                        var empArr = [];
                        for (var i = 0; i < res.length; i++) 
                        {
                            empArr.push(res[i].last_name);
                        }
                        return emptArr;
                    }
            }]) 
        },
        ),

    connection.query("SELECT role.title FROM role", function(err, res) 
        {
            if (err) throw err;
            inquirer
                .prompt
                ([{
                //get from the user the new title from the current list of titles
                    name: "eRole",
                    type: "rawlist",
                    message: "What is the employees new title?",
                    choices: function () 
                    {
                        var titleArray = [];
                        for (var i = 0; i < res.length; i++) 
                        {
                            titleArray.push(res[i].title);
                        }
                        return titleArray;
                    }
                }]) 
        },
        ),

        //.then(answers => {
            findRole(answer.employee.employee_last);

      //  })

}
