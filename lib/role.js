const db = require("../config/connection");
const inquirer = require("inquirer");

require('console.table');
const { getDepartments } = require('./department');

// return list of current roles in the database
const getRoles = async () => {
    let roleList = await db.promise().query("SELECT title FROM role");
    roleList = roleList[0].map(role => role.title);
    return roleList;
    // console.log(roleList);
}

// view all roles in a formatted table
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

// add a role to the database
const addRole = async () => {

    const departmentList = await getDepartments();
    // console.log(departmentList)
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

    const roleAnswer = await inquirer.prompt(roleQuestions);

    const departmentID = await db.promise().query(`SELECT id FROM company_db.department WHERE department.name = ?`, roleAnswer.department)
    const parsedID = departmentID[0][0].id;
    console.log(`${roleAnswer.name} added to roles.`);
    db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`,
        [roleAnswer.name, roleAnswer.salary, parsedID])
}

module.exports = {
    viewRoles,
    addRole,
    getRoles,
};