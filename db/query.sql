-- Displays department table --
SELECT department.id AS 'Department ID',
department.name AS 'Department Name'
FROM company_db.department;

-- Displays role table --
SELECT 
role.id AS 'Role ID',
role.title AS 'Job Title',
role.salary AS 'Salary',
department.name AS 'Department Name'
FROM company_db.role
JOIN department ON department.id = role.department_id;

-- Displays employee table --
SELECT
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
	employee manager on manager.id = employee.manager_id;
