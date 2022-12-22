# Employee Tracker
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

This application allows a user to track and update employee information within a MySQL database. During the design of this application, I learned how to use the mysql2 package to perform sql queries within a node.js environment, and use the results to generate formatted tables. 

## Table of Contents 

- [Installation](#installation)

- [Usage](#usage)

- [License](#license)

- [Contributing](#contributing)

- [Tests](#tests)

- [Questions](#questions)

## Installation

Before running the application, make sure you have installed the 'express' , 'inquirer', 'mysql2', and 'console.table' packages . Navigate to the repository in the terminal and run 'npm i' to install. Make sure you have MySQL installed locally and input your database credentials - DB_USER, DB_PASSWORD, DB_NAME - in a .env file. Use the provided seeds.sql and schema.sql file to prepopulate your database for testing

## Usage

Navigate to the repository in the terminal. Then, run 'node server.js.' The terminal will print a list of possible options to choose from: 'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', and 'Update an employee role'. Select an option and answer the following prompts. When done, you can select 'Exit the application.' to be taken back to the terminal. 

Watch the video at the provided link to see an example README output, or view below: https://drive.google.com/file/d/1C7nmi2uzgPJ-Fzf84rPVC_Ttoc6ZC0j5/view


https://user-images.githubusercontent.com/64799305/209068828-a66491de-56b9-4e00-b1fd-c956471a0aac.mp4


## License

This project is covered under the MIT license.

## Contributing

No contribution guidelines at this time.

## Tests

N/A

## Questions

Direct all questions about this application to the following sources:

Github Profile: https://github.com/agarfar

Email: antfar67@gmail.com
