const Promise = require('bluebird').Promise;
const fs = Promise.promisifyAll(require('fs'));

const showdown = require('showdown');
const converter = new showdown.Converter();

fs.readFileAsync("README.md", "utf-8")
    .then((text) => {
        fs.writeFileAsync('dist/index.html', converter.makeHtml(text))
            .then(() => { console.log('Index build finished') })
            .catch((err) => { throw err; });
    })
    .catch((err) => {
        throw err;
    });

