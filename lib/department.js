const db = require("../config/connection");
const inquirer = require("inquirer");

require('console.table');

const departmentQuestions = [
    {
        type: "input",
        message: "Enter department name:",
        name: "name",
    },
];

// let departmentList;
// const departmentList = ['Sales', 'Engineering', 'Finance', 'Legal'];

const getDepartments = async () => {
    let departmentList = await db.promise().query("SELECT name FROM department");
    departmentList = departmentList[0].map(department => department.name);
    return departmentList;
    // console.log(departmentList);
}

const viewDepartments = async () => {
    const departments = await db.promise().query(
        `SELECT department.id AS 'Department ID',
    department.name AS 'Department Name'
    FROM company_db.department`);
    console.table(departments[0]);
}
const addDepartment = async () => {
    let departmentAnswer = await inquirer.prompt(departmentQuestions);
    let department = departmentAnswer.name;
    await db.promise().query(
        `INSERT INTO department (name)
    VALUES (?);`, department);

    // departmentList.push(department);
    // console.log(departmentList)
    console.log(`${department} added to departments.`);

}

module.exports = {
    departmentQuestions,
    // departmentList,
    viewDepartments,
    getDepartments,
    addDepartment
};