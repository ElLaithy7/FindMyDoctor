const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

// API Imports
const doctors = require('./routes/api/doctors');
const patients = require('./routes/api/patients');
const appointments = require('./routes/api/appointments');

const app = express();
app.use(cors());

// DB Config
const db = process.env.MONGO_URI;
const dbConfig = { useNewUrlParser: true };
mongoose
  .connect(db, dbConfig)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Passport configuration
require('./config/passport')(passport);

// API Routes go here
app.use('/api/doctors', doctors);
app.use('/api/patients', patients);
app.use('/api/appointments', appointments);

// 404s
app.use((req, res) => {
  return res.sendStatus(404);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
