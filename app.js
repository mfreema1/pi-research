const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('dist'));

require('./routes')(app);

const port = 3000;
app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});
