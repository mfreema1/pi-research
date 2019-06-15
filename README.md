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
If you're new to the project, welcome!  There is some stuff you'll need to know -- you can find most of it below.  If you need more information, please reach out to me via email -- Professor Vesonder or the People Finder can give you my address.

### Raspberry Pi
What is a Raspberry Pi?  They are virtually the same as any other computer, just on a much smaller scale.  Our Raspberry Pi units are loaded with a special operating system called Raspbian, which is a distribution stemming from Debian Linux (hence the mashup between Raspberry and Debian).  

If you're familiar with other Debian versions of Linux, such as Ubuntu or Mint, you'll likely feel right at home in Raspbian.  If not, you may want to familiarize yourself with Linux and the `apt` package manager (from Debian), as there is a fair amount of system administration needed for this project.

### Project Specifics
The ultimate goal of the project is to derive useful metrics for the design of smart cities using environmental information gathered from a network of Raspberry Pi sensor units.  Each of these Raspberry Pi units is equipped with a BME680 sensor, which can sample the nearby space for items such as temperature, humidity, pressure, etc.  We'll need to collect as much data on these features as possible to generate our conclusions.

At a high level, the project involves a network of Raspberry Pi units that all communicate with a central server named Mallard.  For our usage, the Raspberry Pi units will act as clients and Mallard will act as the server -- the reverse never occurs.  If you're confused, please check out the ![Client-Server Model](https://en.wikipedia.org/wiki/Client%E2%80%93server_model), as it is very commonly used to describe systems such as this one.

### Client Side
Recall that the Raspberry Pi units are outfitted with a BME680 sensor.  Thankfully, some folks over at ![Pimoroni]('https://github.com/pimoroni/bme680-python') developed a Python package to programmatically interface with it.  To keep things simple, everything on the client side is written in either Bash or Python -- two very important languages to know!  Python is used to collect and upload our data, while Bash handles much of the system-level stuff like Cron.

Cron ensures that our Python scripts sample the environment in 1 minute intervals, the results of which are appended to a .csv file.  Every 4 hours, the local .csv file is emptied and the data is sent over to Mallard.  This web request is performed using the `requests` package for Python.

### Server Side
A variety of stuff is going on with Mallard.  Up front, we have a Node.js/Express web server that will listen for incoming data from Raspberry Pi units.  Upon receipt, this data is dumped into a MySQL database.

To interface with the database, you can interact with the API provided by the web server -- some of this is documented above.  For example, a GET request on `/entries` will download a .tsv file of every stored record.  Feel free to check out the source (likely `routes.js`) for the specifics.
