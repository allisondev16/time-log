const mongoose = require('mongoose');
require('dotenv').config()
const connection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9fgna.mongodb.net/timelogDB2?retryWrites=true&w=majority`;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));