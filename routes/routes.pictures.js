'use strict'

const express = require('express');
const api = express.Router();
const picCtrl = require('../controllers/controller.picture.js');
const multipart = require('connect-multiparty');
const multipartMiddelware = multipart({ uploadDir: './uploads' });



//Rutas API PICTURE
api.get("/picture/:id",picCtrl.getPicture)
api.get("/pictures/:album?",picCtrl.getPictures);
api.post("/picture",picCtrl.savePicture);
api.put("/picture/:id",picCtrl.updatePicture);
api.delete("/picture/:id",picCtrl.deletePicture);
api.post("/uploadPicture/:id",multipartMiddelware,picCtrl.uploadPicture);
api.get("/getFile/:pictureFile",multipartMiddelware,picCtrl.getPictureFile);


module.exports = api;
