// Import and require mysql2
const mysql = require('mysql2');
//const questions = require('./questions');
const inquirer = require("inquirer");
//const queries = require('./queries');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
);
db.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
});

// module.exports = db;

// questions.mainMenu();

var wait = null;

async function mainMenu() {
    // main menu
    while (1) {
        await inquirer
            .prompt([{
                type: 'rawlist',
                name: 'mainmenu',
                message: 'What would you like to do? ',
                choices: [{
                    value: 'View all departments',
                    name: 'View all departments'
                }, {
                    value: 'View all roles',
                    name: 'View all roles'
                }, {
                    value: 'View all employees',
                    name: 'View all employees'
                }, {
                    value: 'Create department',
                    name: 'Create department'
                }, {
                    value: 'Create employee',
                    name: 'Create employee'
                }, {
                    value: 'Update employee role',
                    name: 'Update employee role'
                }, {
                    value: 'Quit program',
                    name: 'Quit program'
                }]
            }])
            .then(async(answers) => {
                switch (answers.mainmenu) {
                    case 'View all departments':
                        wait = await viewAllDepartments();
                        break;
                    case 'View all roles':
                        wait = await viewAllRoles();
                        break;
                    case 'View all employees':
                        wait = await viewAllEmployees();
                        break;
                    case 'Create department':
                        wait = await questionsCreateDepartment();
                        break;
                    case 'Create employee':
                        wait = await questionsCreateEmployee();
                        break;
                    case 'Update employee role':
                        wait = await questionsUpdateEmployeeRole();
                        break;
                    case 'Quit program':
                        process.exit(0);
                }
            });
    }
}

async function viewAllDepartments() {
    db.query({ sql: `SELECT * FROM departments;` }, function(err, results, fields) {
        console.table('\n', results);
    })
}

async function viewAllRoles() {
    db.query({ sql: `SELECT * FROM roles;` }, function(err, results, fields) {
        console.table('\n', results);
    })
}

async function viewAllEmployees() {
    db.query({ sql: `SELECT * FROM employees;` }, function(err, results, fields) {
        console.table('\n', results);
    })
}

async function createDepartment(deptName) {

}

async function createRole() {

}

async function createEmployee(fName, lName, role, managerId) {

}

async function updateEmployeeRole() {

}



async function questionsCreateDepartment() {
    // menu to create department
    inquirer
        .prompt([{
            type: 'input',
            name: 'deptName',
            message: 'Department name: '
        }])
        .then((answers) => {
            createDepartment(answers.deptName);
        })
}

async function questionsCreateEmployee() {
    // menu to create employee
    inquirer
        .prompt([{
            type: 'input',
            name: 'fName',
            message: "Employee's first name: "
        }, {
            type: 'input',
            name: 'lName',
            message: "Employee's last name: "
        }, {
            type: 'input',
            name: 'role',
            message: "Employee's role: "
        }, {
            type: 'input',
            name: 'managerId',
            message: "Employee manager's id: "
        }])
        .then((answers) => {
            createEmployee(answers.fName, answers.lName, answers.role, answers.managerId);
        })

}

async function questionsUpdateEmployeeRole() {

}

mainMenu();