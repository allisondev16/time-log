const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const path = require('path');

// App Config
const app = express();
const port = process.env.PORT || 5000;
const connection_url = "mongodb+srv://timelog:f@E7D_6prRXdma3@cluster0.9fgna.mongodb.net/timelogDB?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// API
const timeLogs = require('./api/timeLogs');
app.use('/api/timeLogs', timeLogs);

// API Endpoints
// app.use(express.static(path.join(__dirname, '../build')));
// app.get('/home', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build'))
// });

app.listen(port, function () {
  console.log("Server is up!")
});
