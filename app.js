/**
 * Portfolio site built with Node.js and Express
 * 
 * Created as part of the Treehouse Full Stack JavaScript Techdegree
 * 
 */

const express = require('express');
const path = require('path');
const { projects } = require('./data.json');

const app = express();

// Set up our Pug templating
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Establish our static assets route
app.use('/static', express.static(path.join(__dirname, 'public')));

// Main routes
app.get('/', (req, res) => {
  res.render('index', { projects });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project/:id', (req, res) => {
  const project = projects[+req.params.id];
  res.render('project', { project });
});

// Handle 404 errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// General error handler
app.use((err, req, res, next) => {
  if (err.status !== 404) {
    err.message = 'Something went wrong!';
  }
  res.status(err.status);
  console.log(`${err.message} (Status Code: ${err.status})`);
  res.render('error', { error: err });
});

app.listen(3000);
console.log('App started and listening on port 3000.');