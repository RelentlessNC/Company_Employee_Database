# Company Employee Tracker

## Purpose

This is a console based application using Node.js and MySQL2 to create a database to keep track of a company's employees.  Track employees, departments, and roles.

## [Video walkthrough](https://youtu.be/bNQQ0aaK5YQ)

## Technologies Used

- JavaScript
- Node.js
- Inquirer
- MySQL2

## Code Information

Database schema includes tables labeled “employee,” role,” and “department.”

![image](./assets/12-sql-homework-demo-01.png)

As the image illustrates, the schema contains the following three tables:

- department
  - id: INT PRIMARY KEY
  - name: VARCHAR(30) to hold department name
- role
  - id: INT PRIMARY KEY
  - title: VARCHAR(30) to hold role title
  - salary: DECIMAL to hold role salary
  - department_id: INT to hold reference to department role belongs to
- employee
  - id: INT PRIMARY KEY
  - first_name: VARCHAR(30) to hold employee first name
  - last_name: VARCHAR(30) to hold employee last name
  - role_id: INT to hold reference to employee role
  - manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

## Future Updates

- Update employee managers.
- View employees by manager.
- View employees by department.
- Delete departments, roles, and employees.
- View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
