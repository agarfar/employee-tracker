require('console.table');
const { roleList } = require('./role');

const db = require("../config/connection");
const employeeList = ["Michael Keaton", "Jackie Brown", "Vincent Vega", "Jackie Brown",
    "Sam Jackson", "Topher Smith", "Roger Robinson", "Anthony Farris"];

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
        type: "list",
        message: "Enter employee's manager:",
        name: "manager",
        choices: employeeList,
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

const addEmployee = async (firstName, lastName, role, manager) => {
    managerName = manager.split(' ');
    console.log(managerName);

    const roleID = await db.promise().query(`SELECT id FROM company_db.role WHERE role.title = ?`, role);

    const managerID = await db.promise().query(`SELECT id FROM company_db.employee WHERE employee.first_name = ? and employee.last_name = ?`, managerName);

    const parsedRoleID = roleID[0][0].id;
    console.log("role ID: ", parsedRoleID);

    const parsedManagerID = managerID[0][0].id;
    console.log("manager ID: ", parsedManagerID);

    employeeList.push(firstName + ' ' + lastName);
    db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
        [firstName, lastName, parsedRoleID, parsedManagerID])
}


module.exports = {
    employeeQuestions,
    viewEmployees,
    addEmployee
};