// // Employee class constructor
// class Employee {
//     constructor(name, id, email) {
//         this.name = name;
//         this.id = id;
//         this.email = email;
//     }
// // Employee methods
//     getName() {
//         return this.name;
//     }

//     getId() {
//         return this.id;
//     }

//     getEmail() {
//         return this.email;
//     }

//     getRole() {
//         return "Employee";
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

const roleQuestions = [
    {
        type: "input",
        message: "Enter role name:",
        name: "name",
    },

    {
        type: "number",
        message: "Enter salary",
        name: "salary",
    },

    {
        type: "list",
        message: "Choose department:",
        name: "department",
        choices: departmentList,
    },
];

const viewRoles = () => db.query(
    `SELECT 
    role.id AS 'Role ID',
    role.title AS 'Job Title',
    role.salary AS 'Salary',
    department.name AS 'Department Name'
    FROM company_db.role
    JOIN department ON department.id = role.department_id;`,
    (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });

module.exports = {
    viewRoles,
    roleQuestions
};