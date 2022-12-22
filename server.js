const express = require('express');
const inquirer = require("inquirer");

require('dotenv').config();

// bring in table-specific functions
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

// Recursive async function that prompts the user for one of the application options, runs that option's prompt, then asks the user to pick another option
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

// function to initialize application
nextActionPrompt();

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
