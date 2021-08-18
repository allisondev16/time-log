const express = require('express');
const router = express.Router()

const Time = require('../models/timeLog');

router.post("/", (req, res) => {
    const dbTime = req.body;

    Time.create(dbTime, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

router.get('/', (req, res) => {
    Time.find()
        .then(users => res.json(users))
        .catch(err => console.log(err))
})

router.patch("/", (req, res) => {
    const query = { day: new Date().toDateString() };
    Time.findOneAndUpdate(query, req.body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });
});


module.exports = router