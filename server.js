const express = require('express');
const { connectToDatabase } = require('./config/connection');
const routes = require('./routes');
const cwd = process.cwd();

const app = express();
const PORT = 3001;

// Connect to MongoDB
connectToDatabase();

const activity = cwd.includes('01-Activities')
  ? cwd.split('01-Activities')[1]
  : cwd;

// Set up middleware
app.use(express.json());
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`API server for ${activity} running on port ${PORT}!`);
});
