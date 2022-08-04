const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes

app.use('/peoples', require('./controllers/peoples'));
app.use('/games', require('./controllers/games'));
app.use('/songs', require('./controllers/songs'));
app.use('/movies', require('./controllers/movies'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
