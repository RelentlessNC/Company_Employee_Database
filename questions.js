const inquirer = require("inquirer");
const queries = require('./queries');

function mainMenu() {
    // main menu
    inquirer
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
            }]
        }])
        .then((answers) => {
            switch (answers.mainmenu) {
                case 'View all departments':
                    queries.viewAllDepartments();
                    break;
                case 'View all roles':
                    queries.viewAllRoles();
                    break;
                case 'View all employees':
                    queries.viewAllEmployees();
                    break;
                case 'Create department':
                    questionsCreateDepartment();
                    break;
                case 'Create employee':
                    questionsCreateEmployee();
                    break;
                case 'Update employee role':
                    questionsUpdateEmployeeRole();
                    break;
                default:
                    break;
            }
            console.log(answers.mainmenu);
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
            queries.createDepartment(answers.deptName);
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
            queries.createEmployee(answers.fName, answers.lName, answers.role, answers.managerId);
        })

}

function questionsUpdateEmployeeRole() {

}


module.exports = { mainMenu };