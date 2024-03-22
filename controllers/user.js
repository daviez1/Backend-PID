
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');



const userGet = async ( req, res = response ) => {

  const { limite = 3, desde = 0 } = req.query;
  const query = { estado: true }

  // validar que no entren letras en  limit, skip

/*   const usuarios = await User.find( query )
    .skip( Number( desde ))
    .limit(Number( limite ))

  const total = await User.countDocuments( query ); */

  const [ total, usuarios ] = await Promise.all([
    User.countDocuments( query ),
    User.find( query )
      .skip( Number( desde ))
      .limit(Number( limite ))
  ])
  
  res.json({
    total, 
    usuarios
  });
}


const userPut = async ( req, res ) => {

  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // Validar contra la DB
  if ( password ) {
      // Encriptar la contrsena
     const salt =  bcryptjs.genSaltSync(15); // por defecto ( 10 );
     resto.password = bcryptjs.hashSync( password, salt );
  }

  const usuario = await User.findByIdAndUpdate( id, resto );

  res.json({
    usuario
  }); 
}


const userPost = async ( req = request, res = response ) => {

  const { nombre, correo, password } = req.body;
  const user = new User({ nombre, correo, password });


  // Encriptar la contrsena
  const salt =  bcryptjs.genSaltSync(15); // por defecto ( 10 );
  user.password = bcryptjs.hashSync( password, salt );

  // Guardar en DB
  await user.save();

  res.status(201).json({
    user
  });
}


const userDelete = async ( req, res ) => {

  const { id } = req.params;

  // Fisicamente lo borramos
  // const usuario = await User.findByIdAndDelete( id );

  const usuario = await User.findByIdAndUpdate( id, { estado: false });
  // const usuarioAutenticado = req.user;

  res.json({
    usuario,
  });
}


module.exports = {
  userGet,
  userDelete,
  userPost,
  userPut
}