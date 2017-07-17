'use strict'

let Album = require('../models/model.album');


function getAlbum(req,res) {
  let albumId = req.params.id;
  Album.findById(albumId, (err, album) => {
    if (err) {
      res.status(500).send({message : "Error al devolver el album"});
    }
    else{
      res.status(200).send({album});
    }
  });
}


function getAlbums(req,res){
  let id = req.params.id;
  Album.find({}).sort('-_id').exec((err, albums) => {
    if (err) {
      res.status(500).send({message : "Error al devolver los marcadores"});
    }
    else{
      res.status(200).send({albums});
    }
  });
}


function saveAlbum(req,res){
  var params = req.body;
  console.log(params);
  let album =  new Album();
  album.title = params.title;
  album.description = params.description;

  album.save((err, albumStored) => {
    if (err) {
      res.status(500).send({message : "Error al guardar el album"});
    }
    else {
      res.status(200).send({album : albumStored});
    }
  });
}


function updateAlbum(req,res){
  let albumId = req.params.id;
  var update = req.body;
  Album.update({_id : albumId },{$set : {title: update.title, description: update.description}}, (err, album) => {
    if (err) {
      res.status(500).send({message : "Error al actualizar el album"});
    }
    else {
      res.status(200).send({album});
    }
  });
}


function deleteAlbum(req,res){
  let albumId = req.params.id;
  console.log("albumId : " + albumId);
  Album.remove({_id : albumId}, (err, album) => {
    if (err) {
      res.status(500).send({message : "Error al borrar el album"});
    }
    else {
      res.status(200).send({message : "El album ha sido borrado"});
    }
  });
}


module.exports = {
  getAlbum,
  getAlbums,
  saveAlbum,
  updateAlbum,
  deleteAlbum
}
