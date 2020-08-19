const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');

const app = express();

require('dotenv').config();
require('./config/database');

const usersRoutes = require('./routes/api/users');
const puppiesRoutes = require('./routes/api/puppies');

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// API routes

app.use('/api/users', usersRoutes);
app.use(require('./config/auth'))
app.use('/api/puppies', puppiesRoutes);

// Catch all
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`)
});