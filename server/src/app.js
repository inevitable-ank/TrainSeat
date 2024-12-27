const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const seatsRoutes = require('./routes/seats');
const reserveRoutes = require('./routes/reserve');
const cancelRoutes = require('./routes/cancel');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/seats', seatsRoutes);
app.use('/reserve', reserveRoutes);
app.use('/cancel', cancelRoutes);

module.exports = app;
