const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    country: String,
    region: String,
    eu: Number,
    timezone: String,
    city: String,
    lat: Number,
    lng: Number,
    metro: String,
    area: String
}, {timestamps: true});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;