const request = require('request');
urls = {
    'localhost': 'http://localhost:3000',
    'localwifi': 'http://192.168.1.200:3000',
    'ec2': 'http://52.55.77.214:3000'
}

const ping = (server, stamp) => {
    const url = urls[server];
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

ping('ec2', true); //hit ec2 with timestamp