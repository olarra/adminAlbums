'use strict'

let Album = require('../models/model.album');
let Picture = require('../models/model.picture');
const path = require('path');
const fs = require('fs');


function getPictures(req,res){
  let albumId = req.params.album;
  if(!albumId){
    //Sacar todas las imagenes de la bd
  var find =  Picture.find({}).sort('title');
  }
  else{
    //Sacar todas las imagenes asociadas al album
  var find = Picture.find({album : albumId}).sort('title');
  }

  find.exec((err, pictures) => {
    if (err) {
      res.status(500).send({message : "Error al devolver los marcadores"});
    }
    else{
      Album.populate(pictures,{path: 'album'},(err, pictures) => {
        if (err) {
          res.status(500).send({message : "Error al devolver la imagen"});
        }
        else{
          res.status(200).send({pictures});
        }
      });
    }
  });
}

function getPicture(req,res) {
  let pictureId = req.params.id;
  Picture.findById(pictureId, (err, picture) => {
    if (err) {
      res.status(500).send({message : "Error al devolver la imagen"});
    }
    else{
      Album.populate(picture,{path: 'album'},(err, picture) => {
        if (err) {
          res.status(500).send({message : "Error al devolver la imagen"});
        }
        else{
          res.status(200).send({picture});
        }
      });
    }
  });
}


function savePicture(req,res){
  var params = req.body;
  console.log(params);
  let picture =  new Picture();
  picture.title = params.title;
  picture.picture = null;
  picture.album = params.album;
  console.log("saving picture with data : " , picture);
  picture.save((err, pictureStored) => {
    if (err) {
      res.status(500).send({message : "Error al guardar la imagen"});
    }
    else {
      res.status(200).send({picture : pictureStored});
    }
  });
}


function updatePicture(req,res){
  let pictureId = req.params.id;
  var update = req.body;
  Picture.update({_id : pictureId },{$set : {title: update.title, picture : update.picture, description: update.description}}, (err, picture) => {
    if (err) {
      res.status(500).send({message : "Error al actualizar la imagen"});
    }
    else {
      res.status(200).send({picture});
    }
  });
}

function deletePicture(req,res){
  let pictureId = req.params.id;
  Picture.remove({_id : pictureId}, (err, picture) => {
    if (err) {
      res.status(500).send({message : "Error al borrar la imagen"});
    }
    else {
      res.status(200).send({message : "La imagen ha sido borrado"});
    }
  });
}


function uploadPicture(req,res){

  console.log("uploadPicture Ctrl listening ... ");

  let pictureId = req.params.id;

  if(req.files){
    let file_path = req.files.picture.path;
    let file_split = file_path.split('/');
    let file_name = file_split[1];

    console.log(`file_path ${file_path} file_name ${file_name}`);

    Picture.update({_id : pictureId },{$set : {picture : file_name }}, (err, picture) => {
      if (err) {
        res.status(500).send({message : "Error al actualizar la imagen"});
      }
      else {
        res.status(200).send({picture});
      }
    });
  }
  else {
    res.status(500).send({message : "No se ha subido la imagen"});
  }

}

function getPictureFile(req,res){
  let pictureFile = req.params.pictureFile;
  fs.exists(`./uploads/${pictureFile}`, exists =>{
    if(exists) res.sendFile(path.resolve(`./uploads/${pictureFile}`));
    else      res.status(500).send({message : "La imagen No existe"});
  });
}

module.exports = {
  getPicture,
  savePicture,
  getPictures,
  deletePicture,
  updatePicture,
  uploadPicture,
  getPictureFile
}
