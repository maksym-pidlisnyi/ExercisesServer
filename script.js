"use strict";

const express = require("express");
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(__dirname));
const url = process.env.MONGODB_URI;

const mongoose = require('mongoose');

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

require('./routes/exercise.routes')(app);


app.get('/', function (req, res) {
    res.sendFile("index")
})

app.get('/', function (req, res) {
    res.status(200).sendFile("exercises.json")
})

app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));
