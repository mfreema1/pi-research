const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./routes')(app);

app.listen(3000, () => {
    console.log('Web server listening on port 3000');
});