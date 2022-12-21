const db = require("../config/connection");

require('console.table');
const { departmentList } = require('./department');

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

const roleList = ['Salesperson', 'Lead Engineer', 'Software Engineer', 'Accountant', 'Account Manager', 'Legal Team Lead', 'Lawyer'];

const viewRoles = async () => {
    const roles = await db.promise().query(
        `SELECT 
    role.id AS 'Role ID',
    role.title AS 'Job Title',
    role.salary AS 'Salary',
    department.name AS 'Department Name'
    FROM company_db.role
    JOIN department ON department.id = role.department_id;`);
    console.table(roles[0])
}

const addRole = async (title, salary, department) => {
    const departmentID = await db.promise().query(`SELECT id FROM company_db.department WHERE department.name = ?`, department)
    console.log(departmentID);
    const parsedID = departmentID[0][0].id;
    console.log(parsedID);
    roleList.push(title);
    console.log(roleList)
    console.log(`${title} added to roles.`);
    db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`,
        [title, salary, parsedID])
}

module.exports = {
    viewRoles,
    addRole,
    roleQuestions,
    roleList
};