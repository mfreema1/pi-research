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