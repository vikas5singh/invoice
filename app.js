const express = require('express');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');
const db = require("./config/db");
const app = express();
const commonRes = require("./utils/response")
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '150mb' }));
// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

// Use Morgan for request logging
app.use(morgan('dev'));
app.use((req, res, next) => { res = commonRes(req, res), next(); });

// Load your routes
require('./routes/mainRoutes')(app);

module.exports = app;