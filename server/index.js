const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const empModel = require('./model/employeeModel');
const employeeModel = require('./model/employeeModel');

const app = express();

// Allow requests from your frontend URL
const allowedOrigins = ['https://front-end-hosting-wine.vercel.app'];

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
app.post('/register', (req, res) => {
  empModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => console.error(err));
});

// Handle login request
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  employeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json('success');
        } else {
          res.json('password is incorrect');
        }
      } else {
        res.json('no records');
      }
    })
    .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
});

// Start the server
app.listen(process.env.PORT || 3001, () => {
  console.log('server is running');
});
