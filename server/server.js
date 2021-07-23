const path = require('path');
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/timeLog", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

app.use(express.static(publicPath));

const timeSchema = {
    date: Date,
    overtime: Date
  };

const Time = mongoose.model("Time", timeSchema);

app.get("*", (req,res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });

app.listen(process.env.PORT||3000, function(){
    console.log("Server is up!")
  });