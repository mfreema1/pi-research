const mysql = require('mysql');
const Promise = require('bluebird').Promise;
const fs = Promise.promisifyAll(require('fs'));
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
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
        })
        res.status(200).send({ 'message': 'OK' });
        conn.end();
    });

    //we'll likely need to do a batch insert for this
    app.post('/', (req, res) => {
        const conn = _getConn();
        const values = [req.body.datetime, req.body.humidity, req.body.fahrenheit, req.body.pressure];
        conn.query('INSERT INTO entries (datetime, humidity, fahrenheit, pressure) VALUES (?, ?, ?, ?)', values, (error, results, fields) => {
            if (error) {
                res.status(400).send({ 'message': 'Bad Request' });
                throw error;
            }
            console.log('Deposited new data');
            res.status(200).send({ 'message': 'OK' }); //following AWS style
        });
        conn.end();
    });

    const sendData = (res) => {
        const conn = _getConn();
        conn.query("SELECT * FROM entries INTO OUTFILE '/tmp/data.csv'", (err, results, fields) => {
            if (err) {
                res.status(500).send({ 'message': 'Internal Server Error' });
                console.log("Error forming SQL query");
            }
            else {
                res.status(200).sendFile('/tmp/data.csv');
                console.log('Send out data records');
            }
        });
        conn.end();
    };

    //we may need to escape these
    app.get('/collect', (req, res) => {
        if (fs.existsSync('/tmp/data.csv')) {
            fs.unlinkAsync('/tmp/data.csv')
                .then(() => { sendData(res); })
                .catch((err) => {
                    res.status(500).send({ 'message': 'Internal Server Error' });
                    console.log("Insufficient permissions, cannot remove file");
                })
        }
        else sendData(res);
    });
}