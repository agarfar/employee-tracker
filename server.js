const express = require('express');
const inquirer = require("inquirer");

require('dotenv').config();

const { viewDepartments, addDepartment } = require('./lib/department');
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

// Prompt to perform another action

const nextActionPrompt = async () => {
    let answer = await inquirer.prompt(nextActionQuestion);
    switch (answer.nextAction) {
        case 'View all departments':
            await viewDepartments()
            nextActionPrompt();
            break;
        case 'View all employees':
            await viewEmployees()
            nextActionPrompt();
            break;
        case 'View all roles':
            await viewRoles()
            nextActionPrompt();
            break;
        case 'Add a department':
            await addDepartment();
            nextActionPrompt();
            break;
        case 'Add a role':
            await addRole();
            nextActionPrompt();
            break;
        case 'Add an employee':
            await addEmployee();
            nextActionPrompt();
            break;
        case 'Update an employee role':
            await updateRole();
            nextActionPrompt();
            break;
        case 'Exit the application':
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
