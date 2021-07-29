// const express = require('e

var express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const bankapi = require('./ControllerAPI/bank.route.js');


app.use('/bankapi', bankapi);

app.listen(8888, () => console.log(`Server listening on port ${8888}!`));
