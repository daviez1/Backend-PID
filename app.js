/* 
require('dotenv').config();

const express = require('express');
const app = express();

app.get('/', function( req, res ) {
  res.send('hello World')
})

app.listen( process.env.PORT, () => {
  console.log('Servidor corriendo en el puerto', process.env.PORT)
})
 */

require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();

