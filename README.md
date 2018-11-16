# Sensor Research with Raspberry Pis
Getting into some neat new research, check in for some new things soon.  Getting it off the ground as we speak (or read?)

## API Specification

### POST / - Add a new entry
Add a new entry to the database.  The request body must be a JSON object of the form:

- `datetime`: (string) MySQL parsable datetime object
- `humidity`: (number) Percent humidity
- `fahrenheit`: (number) Temperature in fahrenheit
- `pressure`: (number) Atmospheric pressure (in atm)

```javascript
//e.g.
{
    'datetime': '2018-11-13 09:25:10',
    'humidity': 40.434,
    'pressure': 1.065,
    'fahrenheit': 72.567
}
```

All fields are optional, although the data is pretty much useless without the `datetime` field for the time-being.

### GET /entries - Get all entries
Retrieve all of the data that the server currently has loaded.  This will send back a .tsv (tab-separated values) file for you to download.  This can be opened in just about any spreadsheet application for analysis.

### POST /entries - Place a batch of entries
Very similar to the POST / endpoint, but accepts an array of objects to all be placed at once.

```javascript
//e.g.
[
    {
        'datetime': '2018-11-13 09:25:10',
        'humidity': 40.434,
        'pressure': 1.065,
        'fahrenheit': 72.567
    },
    {
        'datetime': '2018-11-13 09:32:55',
        'humidity': 41.007,
        'pressure': 1.063,
        'fahrenheit': 73.224
    }
    //...
]

```

## The Main Idea
The reason for doing this is to track human behavior in relation to the environment -- specifically the variables of what makes a space pleasant and draws people to it.  If we can track and predict the flow of people through a given area, then perhaps this can lead to improved city planning and applications in smart cities.

In order to effectively track flow, we will need to populate an area with a number of sensors -- Raspberry Pi controllers in this case -- and periodically sample the environment.  Consistency of collection and storage will be important, as even minor gaps in the data will make it difficult to track patterns and draw conclusions.

## How it Works
The idea is that we have a server that receives data from a number of Raspberry Pi units constantly sampling a given area.  The server only acts as a collection point as of right now -- we may be looking into expanding the role of the server or transitioning to AWS Lambda or S3.

### EC2
At this point, we have one AWS t2.micro instance sitting in the cloud. To receive data, the EC2 exposes has a web server that takes post requests on two endpoints -- `/` and `/entries`.  This allows the server to take in singular or batch entries.  All entries are deposited onto a local MySQL server for safe keeping.

### Raspberry Pi
Our Raspberry Pi prototype unit has a module attached to it that allows it to collect some measurements -- humidity, temperature, and pressure.  We have a cron job on this Raspberry Pi set up to take a sample of the environment every minute and drop it into a local .csv file.  Every four hours, this file is uploaded to the EC2 instance and the the local copy is emptied to make room for more collection.  If the upload fails for whatever reason, the Pi does not delete the local copy and instead keeps appending to the file while it has space.

## Technology Used
- Unix - screen, cron, ssh, vim
- Languages - Python, JavaScript, Bash, SQL
- Packages
    - pip - requests, bme680 (sensor driver)
    - npm - express, mysql, request, body-parser, bluebird, jest, showdown
    - apt / yum - mysql-server
- Web Services
    - AWS - EC2
- Other - Postman