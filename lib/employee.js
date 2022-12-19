// // bring in Employee class
// const Employee = require('./employee');

// // Create subclass Engineer from Employee
// class Engineer extends Employee {
//     constructor(name, id, email, github) {
//         super(name, id, email);
//         this.github = github;
//     }
//     // Engineer methods
//     getRole() {
//         return "Engineer";
//     }
//     getGithub() {
//         return this.github;
//     }
// }

require('dotenv').config();
const cTable = require('console.table');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: DB_USER,
        // MySQL password
        password: DB_PASSWORD,
        database: DB_NAME
    },
    console.log(`Connected to the company_db database.`)
);

const employeeQuestions = [
    {
        type: "input",
        message: "Enter employee's first name:",
        name: "firstName",
    },

    {
        type: "input",
        message: "Enter employee's last name:",
        name: "lastName",
    },

    {
        type: "list",
        message: "Enter employee's role",
        name: "role",
        choices: rolelist,
    },

    {
        type: "input",
        message: "Enter employee's manager:",
        name: "manager",
    },
];

const viewEmployees = () => db.query(
    `SELECT
	employee.id AS 'Employee ID',
    employee.first_name AS 'First Name',
    employee.last_name AS 'Last Name',
    role.title AS 'Title',
    department.name AS 'Department',
    role.salary AS 'Salary',
    CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager'
FROM
	employee
LEFT JOIN 
	role ON employee.role_id = role.id 
LEFT JOIN 
	department on role.department_id = department.id
LEFT JOIN
	employee manager on manager.id = employee.manager_id;`,
    (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });

module.exports = {
    employeeQuestions,
    viewEmployees
};