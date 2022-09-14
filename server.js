// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer");

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
                        }, {
                            type: 'input',
                            name: 'salary',
                            message: 'Salary: '
                        }, {
                            type: 'input',
                            name: 'departmentId',
                            message: 'Department ID: '
                        }])
                        .then((answers) => {
                            createRole(answers.roleName, answers.salary, answers.departmentId);
                        })
                    break;
                case 'Create employee':
                    inquirer
                        .prompt([{
                            type: 'input',
                            name: 'fName',
                            message: 'First name: '
                        }, {
                            type: 'input',
                            name: 'lName',
                            message: 'Last name: '
                        }, {
                            type: 'input',
                            name: 'role',
                            message: 'Role ID: '
                        }, {
                            type: 'input',
                            name: 'managerId',
                            message: "Manager's ID: "
                        }])
                        .then((answers) => {
                            createEmployee(answers.fName, answers.lName, answers.role, answers.managerId);
                        })
                    break;
                case 'Update employee role':
                    inquirer
                        .prompt([{
                            type: 'input',
                            name: 'employeeId',
                            message: 'ID of Employee to update: '
                        }, {
                            type: 'input',
                            name: 'newRole',
                            message: 'What is their new role? '
                        }])
                        .then((answers) => {
                            updateEmployeeRole(answers.employeeId, answers.newRole);
                        })
                    break;
                case 'Quit program':
                    process.exit(0);
            }
        });
}

function viewAllDepartments() {
    const mysql = `SELECT id AS 'ID', name AS 'Department' FROM departments`;
    db.query(mysql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.table(rows);
        mainMenu();
    });
}

function viewAllRoles() {
    const mysql = `SELECT roles.id AS 'ID',roles.title AS 'Title',roles.salary AS 'Salary', departments.name AS 'Department' FROM roles JOIN departments ON roles.department_id = departments.id`;
    db.query(mysql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.table(rows);
        mainMenu();
    });
}

function viewAllEmployees() {
    const mysql = `SELECT employees.id AS 'ID', CONCAT(employees.first_name, ' ', employees.last_name) AS 'Name', roles.title AS 'Title', manager_id AS "Manager's ID" FROM employees JOIN roles ON employees.role_id = roles.id`;
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

function createRole(roleName, salary, deptId) {
    const mysql = `INSERT INTO roles (title,salary,department_id)
    VALUES ("${roleName}","${salary}","${deptId}")`;
    db.query(mysql, (err, rows) => {
        if (err) throw err;
        console.log(`\nAdded '${roleName}' to the roles table.`);
        mainMenu();
    });
}

function createEmployee(fName, lName, role, managerId) {
    const mysql = `INSERT INTO employees (first_name,last_name,role_id,manager_id)
    VALUES("${fName}","${lName}","${role}","${managerId}")`;
    db.query(mysql, (err, rows) => {
        if (err) throw err;
        console.log(`\nAdded ${fName} ${lName} to employees.`);
        mainMenu();
    });
}

function updateEmployeeRole(eId, nRole) {
    const mysql = `UPDATE employees SET role_id = "${nRole}" WHERE id = "${eId}";`;
    db.query(mysql, (err, rows) => {
        if (err) throw err;
        console.log(`\nUpdated employee with ID ${eId}`);
        mainMenu();
    });
}

mainMenu();