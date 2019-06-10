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

## Getting Started
If you're new to the project, there is some stuff you'll need to know.   You can find most of what you'll need below.

The project involves a bunch of Raspberry Pi sensor units that communicate information back to Mallard, which is a server on Stevens campus.  For our usage, the Raspberry Pi units will act as clients and Mallard will act as the server.

### Client Side
As you're likely aware, the Raspberry Pi units are outfitted with a BME680 sensor which can take a variety of readings from the environment.  Some folks over at ![Pimoroni]('https://github.com/pimoroni/bme680-python') developed a package to help interface with the sensor -- the Python scripts on the client utilize this to gather data.

Raspberry Pi units run on Raspbian, which is a derivative of the Debian Linux distribution.  You may want to familizarize yourself with Linux and the `apt` package manager (from Debian), as there is a fair amount of system administration needed for this project.

To collect data, the units run a Python script that samples the environment and appends the result to a .csv file.  Cron is used to run this script in 1 minute intervals.  Every 4 hours, the local .csv file is wiped and the data is sent over to Mallard.  This web request is done using the `requests` package.

### Server Side
On Mallard, Node.js with Express is used to create a web server that will listen for incoming data, which is then dumped into a MySQL database for storage.  You may access this data by using a GET request on `/entries`.  Feel free to check out the source for the specifics.

Should you have any questions, please reach out to me via email -- Professor Vesonder or the People Finder can give you my address.