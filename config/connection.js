require('dotenv').config();
const mysql = require('mysql2');

// console.log("hitting connection", process.env.DB_NAME, process.env.DB_USER);

const connection = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // MySQL password
        password:  process.env.DB_PASSWORD,
        database:  process.env.DB_NAME
    },
    console.log(`Connected to the company_db database.`)
);

connection.connect((err) => {
    if (err) throw err
});

module.exports = connection;