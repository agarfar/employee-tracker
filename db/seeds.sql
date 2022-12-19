INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000,2),
       ("Software Engineer", 120000,2),
       ("Accountant", 125000,3),
       ("Account Manager", 160000,3),
       ("Legal Team Lead", 250000,4),
       ("Lawyer", 190000, 4);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Keaton", 2, NULL),
       ("Vincent", "Vega", 5, NULL),
       ("Jackie", "Brown", 1, NULL),
       ("Sam", "Jackson", 1, NULL),
       ("Topher", "Smith", 1, 3),
       ("Roger", "Robinson", 4, 2),
       ("Anthony", "Farris", 3, 1);
       