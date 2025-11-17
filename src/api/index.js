require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const jobsRoute = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mcp_hub';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve dashboard static
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', jobsRoute);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log(`API listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
