// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const cTable = require("console.table");
const db = mysql.createConnection(
    {
        host: 'localhost',
      // MySQL username,
        user: 'root',
      // MySQL password
        password: 'Mahmoud1994',
        database: 'employees'
    },
    console.log(`Connected to the employees database.`)
);
// Initiate the application by calling the start function
start();
// Connect to the database.
db.connect();
// function displays an ASCII logo and initiates the main prompts
    function start() {
        const logoShape = logo({name: 'Employee Manager'}).render();
        console.log(logoShape);
        startPrompts();
    }
// prompts using inquirer to get user's choice
    function startPrompts() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    {
                        name: 'View All Departments',
                        value: 'VIEW_DEPARTMENTS'
                    },
                    {
                        name: 'View All Roles',
                        value: 'VIEW_ROLES'
                    },
                    {
                        name: 'View All Employees',
                        value: 'VIEW_EMPLOYEES'
                    },
                    {
                        name: 'Add Department',
                        value: 'ADD_DEPARTMENT'
                    },
                    {
                        name: 'Add Role',
                        value: 'ADD_ROLE'
                    },
                    {
                        name: 'ADD Employee',
                        value: 'ADD_EMPLOYEE'
                    },
                    {
                        name: 'Update Employee Role',
                        value: 'UPDATE_EMPLOYEE_ROLE'
                    },
                    {
                        name: 'Quit',
                        value: 'QUIT'
                    }
                ]
            }
            // Depending on the user's choice, a respective function is called
        ]).then(res => {
            let choice = res.choice;
            switch (choice) {
                case 'VIEW_DEPARTMENTS':
                    viewDepartments();
                    break;
                case 'VIEW_ROLES':
                    viewRoles();
                    break;
                case 'VIEW_EMPLOYEES':
                    viewEmployees();
                    break;
                case 'ADD_DEPARTMENT':
                    addDepartment();
                    break;
                case 'ADD_ROLE':
                    addRole();
                    break;
                case 'ADD_EMPLOYEE':
                    addEmployee();
                    break;
                case 'UPDATE_EMPLOYEE_ROLE':
                    updateEmployeeRole();
                    break;
                default:
                    quit();
            }
        }
        )
    }
// Function to fetch and display all departments.
    function viewDepartments() {
        db.query("SELECT * FROM department ORDER BY id ASC", (error, res) => {
            if (error) {
                console.error("Error fetching departments:", error);
                return;
            }
            console.table(res);
            // Go back to the main menu after displaying results.
            startPrompts();
        });
    }
// function to fetch and display all roles
    function viewRoles() {
        db.query("SELECT * FROM role ORDER BY id ASC", (error, res) => {
            if (error) {
                console.error("Error fetching departments:", error);
                return;
            }
            console.table(res);
            startPrompts();
        });
    }
// function to fetch and display all employees
    function viewEmployees() {
        db.query("SELECT * FROM employee ORDER BY id ASC", (error, res) => {
            if (error) {
                console.error("Error fetching departments:", error);
                return;
            }
            console.table(res);
            startPrompts();
        });
    }
// Function to add a new department to the database
    function addDepartment() {
        inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add?'
        }).then(ans => {
            db.query('INSERT INTO department SET ?', ans, (error, res) => {
                if (error) {
                    console.error("Error adding department:", error);
                    return;
                }
                console.log('Department added successfully!');
                viewDepartments();

            });
        });
        
    }
    
// Function to add a new role to the database
    function addRole() {
        inquirer.prompt([
            {
            type: 'input',
            name: 'title',
            message: 'What is the role title you would like to add?'
            },
            {
            type: 'input',
            name: 'salary',
            message: 'What is the role salary you would like to add?'
            },
            {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id you would like to add this role to?'
            }
        ]).then(answer => {
            db.query('INSERT INTO role SET ?', answer, (error, res) => {
                if (error) {
                    console.error("Error adding role:", error);
                    return;
                }
                console.log('role added successfully!');
                viewRoles();
            });
        });
    }
// Function to add a new employee to the database
    function addEmployee() {
        inquirer.prompt([
            {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name you would like to add?"
            },
            {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name you would like to add?"
            },
            {
            type: 'input',
            name: 'role_id',
            message: "What is the employee's role id you would like to add?"
            },
            {
                type: 'input',
                name: 'manager_id',
                message: "What is the employee's manager id you would like to add?"
            }
        ]).then(answer => {
            db.query('INSERT INTO employee SET ?', answer, (error, res) => {
                if (error) {
                    console.error("Error adding employee:", error);
                    return;
                }
                console.log('employee added successfully!');
                viewEmployees();
            });
        });
    }
// Function to update the role of an existing employee
    function updateEmployeeRole() {
        //get a list of employees
        db.promise().query('SELECT id, first_name, last_name FROM employee')
        .then(([rows]) => {
            //Map the employees into a format suitable for inquirer choices
            const employeeChoices = rows.map(({id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            //get a list of roles
            return db.promise().query('SELECT id, title FROM role')
            .then(([lines]) => {
                // Map the roles into a format suitable for inquirer choices
                const roleChoices = lines.map(({id, title}) => ({
                    name: title,
                    value: id
                }));
                // Use inquirer to get user's choices for which employee to update and to what role
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: "Which employee you would like to update?",
                        choices: employeeChoices
                    },
                    {
                        type: 'list',
                        name: 'role_id',
                        message: "Select the new role you would like to update the employee to?",
                        choices: roleChoices
                    },
                ]);
            });
        })
        .then(res => {
            // Update the employee's role in the database based on user's choices
            db.query('UPDATE employee SET role_id = ? WHERE id = ?',[res.role_id, res.id],(error, res) => {
                if (error) {
                    console.error("Error updating employee:", error);
                    return;
                }
                console.log('employee updated successfully!');
                viewEmployees();
            })
        })
        .catch(err => {
            console.error("Error:", err);
        });
    }
    // Function to end the database connection and exit the application
    function quit() {
        db.end();
        process.exit();
    }
    



