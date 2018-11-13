const request = require('request');

const sendWithTimestamp = () => request.post({
    url: 'http://192.168.1.200:3000',
    json: true,
    body: {
        'Timestamp': '2018-11-13 09:25:10',
        'Humidity': 40.434,
        'Pressure': 1.065,
        'Temperature': 72.567
    }
});

const sendWithoutTimestamp = () => request.post({
    url: 'http://192.168.1.200:3000',
    json: true,
    body: {
        'Humidity': 40.434,
        'Pressure': 1.065,
        'Temperature': 72.567
    }
})

sendWithTimestamp();
sendWithoutTimestamp();