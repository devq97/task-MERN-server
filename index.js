const express = require('express');
const connection = require('./config/db');

// Create the server
const app = express();

// Connect to DB
connection();

// App Port
const PORT = process.env.PORT || 4000;

// Define Main Page
app.get('/', (req, res) => {
  res.send('Hello World');
})

// Start App
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
})
