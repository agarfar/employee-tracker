// bring in inquirer
const express = require('express');
const inquirer = require("inquirer");
// const mysql = require('mysql2/promise');
require('dotenv').config();
// const cTable = require('console.table');
const { departmentList, departmentQuestions, viewDepartments, addDepartment } = require('./lib/department');
const { roleList, roleQuestions, viewRoles, addRole } = require('./lib/role');
const { employeeQuestions, updateQuestions, viewEmployees, addEmployee, updateRole } = require('./lib/employee');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const nextActionQuestion = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "nextAction",
        choices: ['View all departments', 'View all employees',
            'View all roles', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit the application'],
    },
]

// Prompt to perform another action
const nextActionPrompt = () => {
    return inquirer
        .prompt(nextActionQuestion)
        .then((answer) => {
            switch (answer.nextAction) {
                case 'View all departments':
                    // code block
                    viewDepartments().then(() => nextActionPrompt());
                    break;
                case 'View all employees':
                    // code block
                    viewEmployees().then(() => nextActionPrompt());
                    break;
                case 'View all roles':
                    // code block
                    viewRoles().then(() => nextActionPrompt());
                    break;
                case 'Add a department':
                    // code block
                    inquirer
                        .prompt(departmentQuestions)
                        .then((answer) => {
                            return addDepartment(answer.name);
                        })
                        .then(() => nextActionPrompt());
                    break;
                case 'Add a role':
                    // code block
                    inquirer
                        .prompt(roleQuestions)
                        .then((answer) => {
                            return addRole(answer.name, answer.salary, answer.department);
                        })
                        .then(() => nextActionPrompt());
                    break;
                case 'Add an employee':
                    // code block
                    inquirer
                        .prompt(employeeQuestions)
                        .then((answer) => {
                            return addEmployee(answer.firstName, answer.lastName, answer.role, answer.manager);
                        })
                        .then(() => nextActionPrompt());
                    break;
                case 'Update an employee role':
                    // code block
                    inquirer
                        .prompt(updateQuestions)
                        .then((answer) => {
                            return updateRole(answer.employee, answer.role);
                        })
                        .then(() => nextActionPrompt());
                    break;
                case 'Exit the application':
                    // code block
                    process.exit(0);
            }
        })
};

nextActionPrompt();

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
