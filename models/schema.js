const mongoose = require('mongoose');
const Schema = mongoose.Schema

const animeSchema = new Schema({
    name: String,
    img: {type: String, required: false},
    year:String,
    genre: String,
    description:String
});

const animeCollection = mongoose.model('Anime', animeSchema)

module.exports = animeCollection