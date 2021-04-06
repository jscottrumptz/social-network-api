// require for express
const express = require('express');
// require for Mongoose
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public folder for later incase I decide to create a front end 
app.use(express.static('public'));

app.use(require('./routes'));

// set up Mongoose to connect when we start the app.
// MongoDB will find and connect to the database if it exists or create the database if it doesn't.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
