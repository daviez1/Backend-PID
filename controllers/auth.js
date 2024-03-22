
const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generarJWT');


const login = async (req, res = response) => {

  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await User.findOne({ correo });
    if( !usuario ){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo'
      })
    }

    // Verificar si el usuario esta activo
    if( !usuario.estado ){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado'
      })
    }

    // Verificar la contrasena
    const valiPassword = bcryptjs.compareSync( password, usuario.password );
    if( !valiPassword ){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      })
    }

    // Generar el JWT
    const token = await generarJWT( usuario.id );


    res.json({
      usuario,
      token
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Hable con el Administrador'
    })
  }
}

module.exports = {
  login,

}