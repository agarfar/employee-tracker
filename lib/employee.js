require('console.table');
const inquirer = require("inquirer");

const { getRoles } = require('./role');

const getEmployees = async () => {
    let employeeList = await db.promise().query("SELECT CONCAT (employee.first_name, ' ', employee.last_name) AS 'name' FROM employee");
    employeeList = employeeList[0].map(employee => employee.name);
    return employeeList;
    // console.log(roleList);
}

const db = require("../config/connection");

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

const addEmployee = async () => {

    const roleList = await getRoles();
    const employeeList = await getEmployees();
    employeeList.push('N/A');

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

    let employeeAnswer = await inquirer.prompt(employeeQuestions);

    let managerName = employeeAnswer.manager;
    if (managerName !== 'N/A') {
        managerName = managerName.split(' ');
    }

    // console.log(managerName);

    const roleID = await db.promise().query(`SELECT id FROM company_db.role WHERE role.title = ?`, employeeAnswer.role);

    // const managerID = await db.promise().query(`SELECT id FROM company_db.employee WHERE employee.first_name = ? and employee.last_name = ?`, managerName);

    const parsedRoleID = roleID[0][0].id;
    // console.log("role ID: ", parsedRoleID);

    // const parsedManagerID = managerID[0][0].id;
    // // console.log("manager ID: ", parsedManagerID);

    if (managerName === 'N/A') {
        db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,NULL);`,
            [employeeAnswer.firstName, employeeAnswer.lastName, parsedRoleID])
    } else {
        const managerID = await db.promise().query(`SELECT id FROM company_db.employee WHERE employee.first_name = ? and employee.last_name = ?`, managerName);
        const parsedManagerID = managerID[0][0].id;
        // console.log("manager ID: ", parsedManagerID);
        db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
            [employeeAnswer.firstName, employeeAnswer.lastName, parsedRoleID, parsedManagerID])
    }
}

const updateRole = async () => {

    const employeeList = await getEmployees();
    const roleList = await getRoles();

    const updateQuestions = [
        {
            type: "list",
            message: "Choose the employee whose role you need to update:",
            name: "employee",
            choices: employeeList,
        },
        {
            type: "list",
            message: "Choose employee's new role",
            name: "role",
            choices: roleList,
        },
    ];

    let updateAnswer = await inquirer.prompt(updateQuestions);

    const employeeName = updateAnswer.employee.split(' ');

    const roleID = await db.promise().query(`SELECT id FROM company_db.role WHERE role.title = ?`, updateAnswer.role);
    const parsedRoleID = roleID[0][0].id;

    db.promise().query(`UPDATE employee SET role_id = ? WHERE employee.first_name = ? and employee.last_name = ?;`,
        [parsedRoleID, employeeName[0], employeeName[1]]);
}

module.exports = {
    viewEmployees,
    addEmployee,
    updateRole
};