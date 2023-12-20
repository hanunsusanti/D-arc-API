'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/user-routes');
const userDataRoutes = require('./routes/userData-routes');
const jobRoutes = require('./routes/job-routes');
const companyRoutes = require('./routes/company-routes');
const app = express();

// app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRoutes.routes);
app.use('/', userDataRoutes.routes);
app.use('/', jobRoutes.routes);
app.use('/', companyRoutes.routes);

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port))