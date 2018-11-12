const request = require('request');

request.post({
    url: 'http://192.168.1.200:3000',
    json: true,
    body: {
        'Timestamp': '12:00 PM',
        'Humidity': '40%',
        'Pressure': '1 atm',
        'Temperature': '72 F'
    }
});