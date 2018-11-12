const mysql = require('mysql');
const express = require('express');
const dbConfig = require('./secret').dbConfig;
const connection = mysql.createConnection(dbConfig);
const app = express();

require('./routes')(app);

connection.connect();
connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if(error) throw error;
    console.log('The solution is: ', results[0].solution);
})

app.listen(3000, () => {
    console.log('Web server listening on port 3000');
});

connection.end();
