'use strict'

const express = require('express');
const api = express.Router();
const albumCtrl = require('../controllers/controller.album.js');


//Rutas API ALBUM
api.get("/albums/",albumCtrl.getAlbums);
api.get("/album/:id",albumCtrl.getAlbum);
api.post("/album",albumCtrl.saveAlbum);
api.put("/album/:id",albumCtrl.updateAlbum);
api.delete("/album/:id",albumCtrl.deleteAlbum);


 api.get('*', function(req, res) {
    	res.sendfile('./app_client/index.html'); // Carga única de la vista
    });


module.exports = api;
