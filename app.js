"use strict";

// dependencies
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let cors = require('cors');

// routes
let router = require('./routes/index');

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(
  {
    origin: ["http://localhost:4200", "http://desafio-ripley-frontend.s3-website.us-east-2.amazonaws.com"],
    credentials: true
  }
));

// routes
app.use('/', router);

module.exports = app;
