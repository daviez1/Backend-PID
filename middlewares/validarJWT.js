
const {response} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user')


const validarJWT = async ( req, res = response, next ) => {

  // x-token headers
  const token = req.header('x-token');

  if ( !token ){
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    })
  }

  try {

    const { uid } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );

    // leer el usuario que corresponde al uid
    const user = await User.findById( uid );

    if( !user ){
      return res.status(401).json({
        msg: 'Token no valido - user'
      })
    }

    // Verificar si el uid tiene estado en true
    if( !user.estado ){
      return res.status(401).json({
        msg: 'Token no valido - estado'
      })
    }

    req.user = user;

    next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Token no valido - error'
    })
  }

}

module.exports = {
  validarJWT
}