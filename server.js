// bring in inquirer
const express = require('express');
const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();
const cTable = require('console.table');
const { departmentQuestions, viewDepartments } = require('./lib/department');
const { roleQuestions, viewRoles } = require('./lib/role');
const { employeeQuestions, viewEmployees } = require('./lib/employee');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         // MySQL username,
//         user: DB_USER,
//         // MySQL password
//         password: DB_PASSWORD,
//         database: DB_NAME
//     },
//     console.log(`Connected to the company_db database.`)
// );

const roleList = ['Salesperson', 'Lead Engineer', 'Software Engineer', 'Accoutant', 'Account Manager', 'Legal Team Lead', 'Lawyer'];
const departmentList = ['Sales', 'Engineering', 'Finance', 'Legal'];

// Department Prompt
// const departmentQuestions = [
//     {
//         type: "input",
//         message: "Enter department name:",
//         name: "name",
//     },
// ];

// Role Prompt 
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

// Employee Prompt
// const employeeQuestions = [
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
//         choices: rolelist,
//     },

//     {
//         type: "input",
//         message: "Enter employee's manager:",
//         name: "manager",
//     },
// ];

// Prompt to add another employee
const nextActionQuestion = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "nextAction",
        choices: ['View all departments', 'View all employees',
            'View all roles', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    },
]

const nextActionPrompt = () => {
    return inquirer
        .prompt(nextActionQuestion)
        .then((answer) => {
            switch (answer.nextAction) {
                case 'View all departments':
                    // code block
                    viewDepartments();
                    break;
                case 'View all employees':
                    // code block
                    viewEmployees();
                    break;
                case 'View all roles':
                    // code block
                    viewRoles();
                    break;
                // case 'Add a department':
                //     // code block
                //     addDepartment();
                //     break;
                // case 'Add a role':
                //     // code block
                //     addRole();
                //     break;
                // case 'Add an employee':
                //     // code block
                //     addEmployee();
                //     break;
                // case 'Update an employee role':
                //     // code block
                //     updateRole();
                //     break;
            }
        })
}

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
