'use strict'
/**
* Para cargar un ficher en forma de modulo se tiene que haber exportado el fichero.
**/
const mongoose = require('mongoose');      //  + mongoose para mongodb
mongoose.Promise = require('bluebird');    //  + Warning about promises
const app = require('./config/app');       //  + Expresse configuration
const port = process.env.PORT || 3700;
const dbname = "albums";
const urldb = `mongodb://localhost:27017/${dbname}`;
//const urldb=`mongodb://root:root@ds161042.mlab.com:61042/${dbname}`;

mongoose.connect(urldb, (err,res) =>{
  if (err) {
    console.log(`error al conectarse a la bd ${err}`);
  }
  else {
    app.listen(port, () => {
      console.log(`Conexion a la bd correcta y API-RESTFUL DE ALBUMS Escuchando en : http://localhost:${port}`);
    });
  }
});
