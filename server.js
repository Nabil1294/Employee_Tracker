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

start();

db.connect();

    function start() {
        const logoShape = logo({name: 'Employee Manger'}).render();
        console.log(logoShape);
        startPrompts();
    }

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
                case 'Add Role':
                    addRole();
                    break;
                case 'ADD Employee':
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

    function viewDepartments() {
        db.query("SELECT * FROM department ORDER BY id ASC", (error, res) => {
            if (error) {
                console.error("Error fetching departments:", error);
                return;
            }
            console.table(res);
            startPrompts();
        });
    }

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

    function addDepartment() {
        inquirer.prompt({
            type: 'input',
            name: 'DepartmentName',
            message: 'What is the name of the department you would like to add?'
        }).then(res => {
            let depName = res.DepartmentName;
            db.query('INSERT INTO department (name) VALUES (?)', [depName], (error, res) => {
                if (error) {
                    console.error("Error adding department:", error);
                    return;
                }
                console.log('Department added successfully!');
                viewDepartments();
                startPrompts();
            });
        });
    }
    

    function quit() {
        db.end();
        process.exit();
    }
    



