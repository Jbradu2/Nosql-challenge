const express = require('express');
const mongoose = require('mongoose');
const { userRoutes, thoughtRoutes, reactionRoutes } = require('./routes');
const { connectToDatabase } = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectToDatabase();

const activity = cwd.includes('01-Activities')
? cwd.split('01-Activities')[1]
: cwd;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//start server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
