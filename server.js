const express = require('express');
const { connectToDatabase } = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = 3001;

// Connect to MongoDB
connectToDatabase();

// Set up middleware
app.use(express.json());
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
