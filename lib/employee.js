require('console.table');
const { roleList } = require('./role');

const db = require("../config/connection");

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
        choices: roleList,
    },

    {
        type: "input",
        message: "Enter employee's manager:",
        name: "manager",
    },
];

const viewEmployees = async () => {
    const employees = await db.promise().query(
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
	employee manager on manager.id = employee.manager_id;`);
    console.table(employees[0]);
}
//     .then(([rows, fields]) => {
//     console.table(rows);
// })
//     .catch(console.log);

module.exports = {
    employeeQuestions,
    viewEmployees
};