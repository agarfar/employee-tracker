// bring in inquirer
const express = require('express');
const inquirer = require("inquirer");
// const mysql = require('mysql2/promise');
require('dotenv').config();
// const cTable = require('console.table');
const { viewDepartments, addDepartment, getDepartments } = require('./lib/department');
const { viewRoles, addRole } = require('./lib/role');
const { viewEmployees, addEmployee, updateRole } = require('./lib/employee');

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

// let departmentList;
// let employeeList;
// let roleList;

// const roleQuestions = [
//     {
//         type: "input",
//         message: "Enter role name:",
//         name: "name",
//     },

//     {
//         type: "number",
//         message: "Enter salary",
//         name: "salary",
//     },

//     {
//         type: "list",
//         message: "Choose department:",
//         name: "department",
//         choices: departmentList,
//     },
// ];

// const updateQuestions = [
//     {
//         type: "list",
//         message: "Choose employee whose role you need to update:",
//         name: "employee",
//         choices: employeeList,
//     },

//     {
//         type: "list",
//         message: "Choose employee's new role",
//         name: "role",
//         choices: roleList,
//     },

// ];

// // const employeeQuestions = [
//     {
//         type: "input",
//         message: "Enter employee's first name:",
//         name: "firstName",
//     },

//     {
//         type: "input",
//         message: "Enter employee's last name:",
//         name: "lastName",
//     },

//     {
//         type: "list",
//         message: "Enter employee's role",
//         name: "role",
//         choices: roleList,
//     },

//     {
//         type: "list",
//         message: "Enter employee's manager:",
//         name: "manager",
//         choices: employeeList,
//     },
// ];

// Prompt to perform another action
// const nextActionPrompt = () => {
//     return inquirer
//         .prompt(nextActionQuestion)
//         .then((answer) => {
//             switch (answer.nextAction) {
//                 case 'View all departments':
//                     // code block
//                     viewDepartments().then(() => nextActionPrompt());
//                     break;
//                 case 'View all employees':
//                     // code block
//                     viewEmployees().then(() => nextActionPrompt());
//                     break;
//                 case 'View all roles':
//                     // code block
//                     viewRoles().then(() => nextActionPrompt());
//                     break;
//                 case 'Add a department':
//                     // code block
//                     inquirer
//                         .prompt(departmentQuestions)
//                         .then((answer) => {
//                             return addDepartment(answer.name);
//                         })
//                         .then(() => nextActionPrompt());
//                     break;
//                 case 'Add a role':
//                     // code block
//                     inquirer
//                         .prompt(roleQuestions)
//                         .then((answer) => {
//                             return addRole(answer.name, answer.salary, answer.department);
//                         })
//                         .then(() => nextActionPrompt());
//                     break;
//                 case 'Add an employee':
//                     // code block
//                     inquirer
//                         .prompt(employeeQuestions)
//                         .then((answer) => {
//                             return addEmployee(answer.firstName, answer.lastName, answer.role, answer.manager);
//                         })
//                         .then(() => nextActionPrompt());
//                     break;
//                 case 'Update an employee role':
//                     // code block
//                     inquirer
//                         .prompt(updateQuestions)
//                         .then((answer) => {
//                             return updateRole(answer.employee, answer.role);
//                         })
//                         .then(() => nextActionPrompt());
//                     break;
//                 case 'Exit the application':
//                     // code block
//                     process.exit(0);
//             }
//         })
// };

// const nextActionPrompt = async () => {
//     let answer = await inquirer.prompt(nextActionQuestion);
//     switch (answer.nextAction) {
//         case 'View all departments':
//             // code block
//             await viewDepartments()
//             nextActionPrompt();
//             break;
//         case 'View all employees':
//             // code block
//             await viewEmployees()
//             nextActionPrompt();
//             break;
//         case 'View all roles':
//             // code block
//             await viewRoles()
//             nextActionPrompt();
//             break;
//         case 'Add a department':
//             // code block
//             let departmentAnswer = await inquirer.prompt(departmentQuestions);
//             await addDepartment(departmentAnswer.name);
//             nextActionPrompt();
//             break;
//         case 'Add a role':
//             // code block
//             let roleAnswer = await inquirer.prompt(roleQuestions);
//             addRole(roleAnswer.name, roleAnswer.salary, roleAnswer.department);
//             nextActionPrompt();
//             break;
//         case 'Add an employee':
//             // code block
//             let employeeAnswer = inquirer.prompt(employeeQuestions);
//             await addEmployee(employeeAnswer.firstName, employeeAnswer.lastName, employeeAnswer.role, employeeAnswer.manager);
//             nextActionPrompt();
//             break;
//         case 'Update an employee role':
//             // code block
//             let updateAnswer = await inquirer.prompt(updateQuestions)
//             await updateRole(updateAnswer.employee, updateAnswer.role);
//             nextActionPrompt();
//             break;
//         case 'Exit the application':
//             // code block
//             process.exit(0);
//     }
// };

const nextActionPrompt = async () => {
    let answer = await inquirer.prompt(nextActionQuestion);
    switch (answer.nextAction) {
        case 'View all departments':
            // code block
            await viewDepartments()
            nextActionPrompt();
            break;
        case 'View all employees':
            // code block
            await viewEmployees()
            nextActionPrompt();
            break;
        case 'View all roles':
            // code block
            await viewRoles()
            nextActionPrompt();
            break;
        case 'Add a department':
            // code block
            // let departmentAnswer = await inquirer.prompt(departmentQuestions);
            await addDepartment();
            nextActionPrompt();
            break;
        case 'Add a role':
            // code block
            // let roleAnswer = await inquirer.prompt(roleQuestions);
            await addRole();
            nextActionPrompt();
            break;
        case 'Add an employee':
            // code block
            // let employeeAnswer = inquirer.prompt(employeeQuestions);
            await addEmployee();
            nextActionPrompt();
            break;
        case 'Update an employee role':
            // code block
            // let updateAnswer = await inquirer.prompt(updateQuestions)
            await updateRole();
            nextActionPrompt();
            break;
        case 'Exit the application':
            // code block
            process.exit(0);
    }
};

nextActionPrompt();

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
