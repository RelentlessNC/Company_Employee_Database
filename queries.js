//const db = require('./server');
const questions = require('./questions');
const db = require('./server');
const mysql = require('mysql2');

function viewAllDepartments() {
    db.query(`SELECT * FROM department;`, function(err, results) {
        console.log(results)
    });
}

function viewAllRoles() {

}

function viewAllEmployees() {

}

function createDepartment(deptName) {

}

function createRole() {

}

function createEmployee(fName, lName, role, managerId) {

}

function updateEmployeeRole() {

}

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, createDepartment, createRole, createEmployee, updateEmployeeRole };