const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Location = require('./models/location');
const path = require('path');
const pug = require('pug');
const geoip = require('geoip-lite');

// Load config
dotenv.config({ path: './config/config.env'});

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_URI;

mongoose.connect(DB_URI)
    .then(console.log('connected to db'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
})
app.get('/', (req, res) => {
    var geo = geoip.lookup(req.ip);
    if (geo != null) {
        const location = new Location({
            country: geo.country,
            region: geo.region,
            eu: geo.eu,
            timezone: geo.timezone,
            city: geo.city,
            lat: geo.ll[0],
            lng: geo.ll[1],
            metro: geo.metro,
            area: geo.area
        });

        location.save()
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const query = Location.find().exec()
        .then((result) => {
            res.render("index", { locations: result });
        })
        .catch((err) => {
            console.log(err);
            res.send("error querying data");
        })
})