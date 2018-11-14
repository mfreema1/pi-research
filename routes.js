const mysql = require('mysql');
const Promise = require('bluebird').Promise;
const fs = Promise.promisifyAll(require('fs'));
const dbConfig = require('./secret').dbConfig;

const _getConn = () => {
    const conn = mysql.createConnection(dbConfig);
    conn.connect();
    return conn;
}

const _sendData = (res) => {
    const conn = _getConn();
    conn.query("SELECT * FROM entries INTO OUTFILE '/tmp/data.tsv'", (err, results, fields) => {
        if (err) {
            res.status(500).send({ 'message': 'Internal Server Error' });
            console.log("Error forming SQL query");
        }
        else {
            res.status(200).download('/tmp/data.tsv', 'sensorData.tsv');
            console.log('Sent out data records');
        }
    });
    conn.end();
};

module.exports = app => {
    app.get('/', (req, res) => {
        //send out the showdown-generated homepage
        res.status(200).sendFile('index.html');
    });

    //we'll likely need to do a batch insert for this
    app.post('/', (req, res) => {
        const conn = _getConn();
        const values = [req.body.datetime, req.body.humidity, req.body.fahrenheit, req.body.pressure];
        conn.query('INSERT INTO entries (datetime, humidity, fahrenheit, pressure) VALUES (?, ?, ?, ?)', values, (err, results, fields) => {
            if (err) {
                res.status(400).send({ 'message': 'Bad Request' });
                console.log(err);
            }
            else {
                console.log('Insert completed');
                res.status(200).send({ 'message': 'OK' }); //following AWS style
            }
        });
        conn.end();
    });

    

    app.get('/entries', (req, res) => {
        if (fs.existsSync('/tmp/data.tsv')) {
            fs.unlinkAsync('/tmp/data.tsv')
                .then(() => { _sendData(res); })
                .catch((err) => {
                    res.status(500).send({ 'message': 'Internal Server Error' });
                    console.log("Insufficient permissions, cannot remove file");
                });
        }
        else _sendData(res);
    });

    app.post('/entries', (req, res) => {
        let values = []
        req.body.forEach(obj => { values.push([obj.datetime, obj.humidity, obj.fahrenheit, obj.pressure]); });

        const conn = _getConn();
        conn.query('INSERT INTO entries (datetime, humidity, fahrenheit, pressure) VALUES ?', [values], (err, results, fields) => {
            if(err) {
                res.status(500).send({ 'message': 'Internal Server Error' });
                console.log("Error forming SQL query");
            }
            else {
                console.log('Batch insert completed');
                res.status(200).send({ 'message': 'OK' });
            }
        });
        conn.end();
    });
}