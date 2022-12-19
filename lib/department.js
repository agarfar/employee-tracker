// bring in Employee class
// const Employee = require('./employee');

// // Create subclass Manager from Employee
// class Manager extends Employee {
//     constructor(name, id, email, officeNumber) {
//         super(name, id, email);
//         this.officeNumber = officeNumber;
//     }
//     // Manager methods
//     getRole() {
//         return "Manager";
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

const departmentQuestions = [
    {
        type: "input",
        message: "Enter department name:",
        name: "name",
    },
];

const viewDepartments = () => db.query(
    `SELECT department.id AS 'Department ID',
department.name AS 'Department Name'
FROM company_db.department;`,
    (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });

module.exports = {
    departmentQuestions,
    viewDepartments
};