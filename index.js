const express = require('express');
const connection = require('./config/db');
const cors = require('cors');

// Create the server
const app = express();

// Connect to DB
connection();

// Enable cors
app.use(cors());

// Express.json
app.use(express.json({ extended: true }));

// App Port
const port = process.env.PORT || 4000;

// Import Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Define Main Page
app.get('/', (req, res) => {
  res.send('Hello World');
})

// Start App
app.listen(port, '0.0.0.0' ,() => {
  console.log(`Listening on Port ${port}`);
})
