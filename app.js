"use strict";

// dependencies
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

// routes
let router = require('./routes/index');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(
  {
    origin: ["http://localhost:4200"],
    credentials: true
  }
));

// routes
app.use('/', router);

module.exports = app;
