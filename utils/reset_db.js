const mysql = require('mysql');
const dbConfig = require('../secret').dbConfig;
const connection = mysql.createConnection(dbConfig);

connection.connect();
connection.query('SHOW TABLES;');