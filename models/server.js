
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth:         '/api/auth',
      usuarios:     '/api/usuarios',
      lab1:         '/api/lab1',
      lab2:         '/api/lab2',
      lab3:         '/api/lab3',
      uploads:      '/api/uploads',
      laboratorios: '/api/laboratorios'
    }

    // Conectar a DB
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi app
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares(){

    // CORS
    this.app.use( cors() );

    // Lectura y parseo del body
    this.app.use( express.json() );

    // Directorio Publico
    this.app.use( express.static('public') )

    // Carga de archivo 
    this.app.use(fileUpload({ // se puede poner limite de tamano
      useTempFiles : true,
      tempFileDir : '/tmp/'
}));
  }

  routes(){

    this.app.use( this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.usuarios, require('../routes/users') )
    this.app.use( this.paths.uploads, require('../routes/uploads'));
    this.app.use( this.paths.lab3, require('../routes/lab3'));
    this.app.use( this.paths.lab2, require('../routes/lab2'));
    this.app.use( this.paths.lab1, require('../routes/lab1'));
    this.app.use( this.paths.laboratorios, require('../routes/laboratorios'));
  }

  listen(){
    this.app.listen( this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port)
    })
  }
}

module.exports = Server;