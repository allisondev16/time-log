const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const path = require('path');

//Create Model
const timeSchema = mongoose.Schema({
    day: String,
    finalTime: Date,
    breakTime: Date,
    breakDuration: Number,
    overtime: Number,
    isStart: Boolean,
    isBreak: Boolean,
    isDone: Boolean
});

const Time = mongoose.model("Time", timeSchema);

// App Config
const app = express();
const port = process.env.PORT || 8001;
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

// API Endpoints
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'))
});

app.post("/time-log/data", (req, res) => {
  const dbTime = req.body;

  Time.create(dbTime, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/time-log/data", (req, res) => {
  Time.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.patch("/time-log/data", (req, res) => {
  const query = {day: new Date().toDateString()};
  Time.findOneAndUpdate(query, req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(port, function () {
  console.log("Server is up!")
});
