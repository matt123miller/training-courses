const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });


const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

app.set("port", process.env.PORT || 3000);

module.exports = app;