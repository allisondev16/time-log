const mongoose = require('mongoose');
const connection = "mongodb+srv://timelog:f@E7D_6prRXdma3@cluster0.9fgna.mongodb.net/timelogDB?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));