// bring in inquirer
const express = require('express');
const inquirer = require("inquirer");
// const mysql = require('mysql2/promise');
require('dotenv').config();
// const cTable = require('console.table');
const { departmentList, departmentQuestions, viewDepartments, addDepartment } = require('./lib/department');
const { roleList, roleQuestions, viewRoles, addRole } = require('./lib/role');
const { employeeQuestions, viewEmployees, addEmployee } = require('./lib/employee');

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
            'View all roles', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
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
                // case 'Update an employee role':
                //     // code block
                //     updateRole();
                //     break;
            }
        })
};

nextActionPrompt();

// // returns manager prompt, waits for response, then returns prompt to add another employee


// // Asks user for manager information, then pushes new Manager object to list of employees
// const managerPrompt = () => {
//     return inquirer
//         .prompt(managerQuestions)
//         .then((answers) => {
//             employeeList.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber))
//         })
// };

// // Asks user for engineer information, then pushes new engineer object to list of employees
// const engineerPrompt = () => {
//     return inquirer
//         .prompt(engineerQuestions)
//         .then((answers) => {
//             employeeList.push(new Engineer(answers.name, answers.id, answers.email, answers.github))
//         })
// };

// // Asks user for intern information, then pushes new Intern object to list of employees
// const internPrompt = () => {
//     return inquirer
//         .prompt(internQuestions)
//         .then((answers) => {
//             employeeList.push(new Intern(answers.name, answers.id, answers.email, answers.school))
//         })
// };

// // Recursive function -> if user requests to input engineer/intern information, the prompt loops. If not, the function ends and a list of employees is returned
// const employeePrompt = () => {
//     return inquirer
//         .prompt(employeeQuestion)
//         .then((answer) => {
//             if (answer.employee === 'Engineer') {
//                 return engineerPrompt()
//                     .then(() => {
//                         return employeePrompt();
//                     })
//             }
//             if (answer.employee === 'Intern') {
//                 return internPrompt()
//                     .then(() => {
//                         return employeePrompt();
//                     })
//             }
//             if (answer.employee === 'I am done adding team members.') {
//                 console.log(employeeList);
//                 return employeeList;
//             }
//         })
// }

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
