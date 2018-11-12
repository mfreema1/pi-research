const mysql = require('mysql');
const dbConfig = require('./secret').dbConfig;

const _getConn = () => {
    const conn = mysql.createConnection(dbConfig);
    conn.connect();
    return conn;
}

module.exports = app => {
    app.get('/', (req, res) => {
        const conn = _getConn();
        conn.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
            if(error) throw error;
            console.log('The solution is: ', results[0].solution);
        })
        res.send('DB hit!');
        conn.end();
    });

    app.post('/', (req, res) => {
        //for now just log it
        console.log(req.body);
    });
}