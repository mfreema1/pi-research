const request = require('request');

const ping = (self, stamp) => {
    const url = self ? 'http://localhost:3000' : 'http://192.168.1.200:3000';
    const body = {
        'humidity': 40.434,
        'pressure': 1.065,
        'fahrenheit': 72.567
    };
    if(stamp) body.datetime = '2018-11-13 09:25:10';
    request.post({ url: url, json: true, body: body }, (err) => {
        if(err) console.log("Could not reach server, please ensure it is started");
    });
};

ping(true, true); //hit local with timestamp
ping(true, false); //hit local without timestamp