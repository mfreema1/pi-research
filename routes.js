const mysql = require('mysql');
const dbConfig = require('./secret').dbConfig;
const connection = mysql.createConnection(dbConfig);
connection.connect();

module.exports = app => {
    app.get('/', (req, res) => {
        connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
            if(error) throw error;
            console.log('The solution is: ', results[0].solution);
        })
        res.send('DB hit!');
    });
}

connection.end();