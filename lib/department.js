const db = require("../config/connection");

require('console.table');

const departmentQuestions = [
    {
        type: "input",
        message: "Enter department name:",
        name: "name",
    },
];
const departmentList = ['Sales', 'Engineering', 'Finance', 'Legal'];

const viewDepartments = async () => {
    const departments = await db.promise().query(
        `SELECT department.id AS 'Department ID',
    department.name AS 'Department Name'
    FROM company_db.department`);
    // .then(([rows, fields]) => {
    console.table(departments[0]);
    // })
    // .catch(console.log);
}
const addDepartment = async (department) => {

    await db.promise().query(
        `INSERT INTO department (name)
    VALUES (?);`, department);


    departmentList.push(department);
    console.log(departmentList)
    console.log(`${department} added to departments.`);

}
// .then( () => db.end());

module.exports = {
    departmentQuestions,
    departmentList,
    viewDepartments,
    addDepartment
};