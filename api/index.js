const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;

mongoose.connect(MONGO_URI);

// Use CORS middleware to allow requests from http://localhost:5173
app.use(cors({
  origin: CLIENT_URL 
}));

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('You do not belong here');
});

app.post('/api/login', (req, res) => {
  const { token, name, email, picture } = req.body;

  // Process the user data as needed
  console.log('Received user data:', { token, name, email, picture });

  // Respond back to the client
  res.json({ message: 'User data received', user: { name, email, picture } });
});

app.listen(4000);
