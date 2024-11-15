const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const empModel = require('./model/employeeModel');
const employeeModel = require('./model/employeeModel');

const app = express();

// Allow requests from your frontend URL
const allowedOrigins = ['https://front-end-hosting-wine.vercel.app/'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the origin if it's in the list or if it's local dev
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,  // Automatically handle OPTIONS requests
  optionsSuccessStatus: 200, // Allow status 200 for OPTIONS requests
};

// Use the CORS middleware
app.use(cors(corsOptions));

// Parse JSON request bodies
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://atchayaangusamy:dI6fmH3nNhpd5C0a@project.t2opm.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/login', (req, res) => {
  res.send('login');
});

// Handle register request
app.post('/api/register', (req, res) => {
    res.send('Registration successful');
  });

// Handle login request
app.post('/api/login', (req, res) => {
    // Get the login details from the request body
    const { username, password } = req.body;
  
    // Simulating authentication (in a real app, you would check the database)
    if (username === 'admin' && password === 'password123') {
      // If credentials are correct, send a success response (you would likely return a token here)
      res.send('Login successful');
    } else {
      // If credentials are incorrect, send an error message
      res.status(401).send('Invalid username or password');
    }
  });
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });