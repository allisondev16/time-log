const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Model
const timeSchema = new Schema({
    day: String,
    finalTime: Date,
    breakTime: Date,
    breakDuration: Number,
    overtime: Number,
    isStart: Boolean,
    isBreak: Boolean,
    isDone: Boolean
});

module.exports = mongoose.model("Time", timeSchema);
