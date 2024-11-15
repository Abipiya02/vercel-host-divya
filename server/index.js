const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const empModel = require('./model/employeeModel');
const employeeModel = require('./model/employeeModel');

// const app = express();

// Allow requests from your frontend URL
// const allowedOrigins = ['https://front-end-hosting-wine.vercel.app/'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true); // Allow the origin if it's in the list or if it's local dev
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   preflightContinue: false,  // Automatically handle OPTIONS requests
//   optionsSuccessStatus: 200, // Allow status 200 for OPTIONS requests
// };

// // Use the CORS middleware
// app.use(cors(corsOptions));







app.get('/', (req, res) => {
    res.send('hello');
  });
  
// CORS setup to allow the frontend from 'https://front-end-hosting-wine.vercel.app'
const allowedOrigins = ['https://front-end-hosting-wine.vercel.app']; // Add your frontend domain here

app.use(cors({
  origin: allowedOrigins,  // Allow specific origins (frontend domains)
  methods: ['GET', 'POST', 'OPTIONS'],  // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
}));

// Middleware to parse JSON bodies
app.use(express.json());
mongoose.connect('mongodb+srv://atchayaangusamy:dI6fmH3nNhpd5C0a@project.t2opm.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

// Allow preflight requests
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://front-end-hosting-wine.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200); // Respond with 200 OK
  });
  
// Sample Register route
app.post('/api/register', (req, res) => {
  // Example: Handle registration logic (this is just a mock)
  const { username, email, password } = req.body;
  console.log('User registered:', { username, email });

  res.send('Registration successful');
});

// Sample Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password123') {
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
