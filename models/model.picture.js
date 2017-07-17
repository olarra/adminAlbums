'use strict'
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Album = require('./model.album');

var PictureSchema = Schema({
  title : String,
  picture : String,
  album : { type: Schema.ObjectId, ref: "Album" } 
});

module.exports =  mongoose.model('picture',PictureSchema);
