const express = require("express");
const Cors = require("cors");
const path = require("path");
const app = express();
require("./database");

// Middlewares
app.use(express.json());
app.use(Cors());

// API
const timeLogs = require('./api/timeLogs');
app.use('/time-log/data', timeLogs);

//API Endpoints
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
