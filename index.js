const express = require('express');
const connection = require('./config/db');

// Create the server
const app = express();

// Connect to DB
connection();

// Express.json
app.use(express.json({ extended: true }));

// App Port
const PORT = process.env.PORT || 4000;

// Import Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Define Main Page
app.get('/', (req, res) => {
  res.send('Hello World');
})

// Start App
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
})
