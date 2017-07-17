/**
** Configuración de express
**/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes_albums = require('../routes/routes.albums');
const routes_pictures = require('../routes/routes.pictures');


app.use(bodyParser.urlencoded({ extended: true }));       // + Parse application/x-ww-form-urlencoded
app.use(bodyParser.json());                               // + Parse application/json
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-API-Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})
app.use(express.static('./app_client'));                  // + Static files localization
app.use("/api", routes_albums);
app.use("/api", routes_pictures);

module.exports = app;
