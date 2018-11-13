const mysql = require('mysql');
const dbConfig = require('../secret').dbConfig;
const connection = mysql.createConnection(dbConfig);

connection.connect();
connection.query("DROP TABLE IF EXISTS entries", (err, results, fields) => {
    if(err) throw err;
    //TODO: investigate issue with NULL being injected into datetime column, not generating DEFAULT value
    connection.query("CREATE TABLE entries (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, datetime DATETIME DEFAULT CURRENT_TIMESTAMP, humidity FLOAT, fahrenheit FLOAT, pressure FLOAT)", (err, res, fields) => {
        if(err) throw err;
        console.log("New table created")
    });
    connection.end();
});