'use strict'
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var AlbumSchema = Schema({
  title : String,
  description : String,
});

module.exports =  mongoose.model('album',AlbumSchema);
