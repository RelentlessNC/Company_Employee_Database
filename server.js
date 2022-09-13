// Import and require mysql2
const mysql = require('mysql2');
//const questions = require('./questions');
const inquirer = require("inquirer");
//const queries = require('./queries');

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

function mainMenu() {
    // main menu
    inquirer
        .prompt([{
            type: 'list',
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
                value: 'Create role',
                name: 'Create role'
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
        .then((answers) => {
            switch (answers.mainmenu) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Create department':
                    inquirer
                        .prompt([{
                            type: 'input',
                            name: 'deptName',
                            message: 'Department name: '
                        }])
                        .then((answers) => {
                            createDepartment(answers.deptName);
                        })
                    break;
                case 'Create role':
                    inquirer
                        .prompt([{
                            type: 'input',
                            name: 'roleName',
                            message: 'Role name: '
                        }])
                        .then((answers) => {
                            createRole(answers.roleName);
                        })
                    break;
                case 'Create employee':
                    questionsCreateEmployee();
                    break;
                case 'Update employee role':
                    questionsUpdateEmployeeRole();
                    break;
                case 'Quit program':
                    process.exit(0);
            }
        });
}

function viewAllDepartments() {
    const mysql = `SELECT * FROM departments`;
    db.query(mysql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.table(rows);
        mainMenu();
    });
}

function viewAllRoles() {
    const mysql = `SELECT * FROM roles`;
    db.query(mysql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.table(rows);
        mainMenu();
    });
}

function viewAllEmployees() {
    const mysql = `SELECT * FROM employees`;
    db.query(mysql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.table(rows);
        mainMenu();
    });
}

function createDepartment(deptName) {
    const mysql = `INSERT INTO departments (name)
    VALUES ("${deptName}")`;
    db.query(mysql, deptName, (err, rows) => {
        if (err) throw err;
        console.log(`\nAdded '${deptName}' to the departments table.`);
        mainMenu();
    });
}

function createRole(roleName) {
    const mysql = `INSERT INTO roles (title)
    VALUES ("${roleName}")`;
    db.query(mysql, roleName, (err, rows) => {
        if (err) throw err;
        console.log(`\nAdded '${roleName}' to the roles table.`);
        mainMenu();
    });
}

function createEmployee(fName, lName, role, managerId) {
    const mysql = ``;
    db.query(mysql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.table(rows);
        mainMenu();
    });
}

function updateEmployeeRole() {
    const mysql = ``;
    db.query(mysql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.table(rows);
        mainMenu();
    });
}

function questionsCreateDepartment() {
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

function questionsCreateEmployee() {
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

function questionsUpdateEmployeeRole() {

}

mainMenu();