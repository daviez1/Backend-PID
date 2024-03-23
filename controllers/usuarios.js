const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuarios');


const obtenerUsuarioPorNombre = async (req = request, res = response) => {
    const { nombre } = req.params

    const usuario = await Usuario.find({ nombre })

    res.json(
        {msg: `usuario de ${nombre}`,
        usuario
    })
}

const usuariosGet = async (req = request, res = response)=> {
    
    const query = {estado: true}
        
        const [usuarios, total] = await Promise.all(
            [Usuario.find(query)
        .skip(0)
        .limit(5),
        Usuario.countDocuments(query)]
        )//Para que las promesas total y usuarios no sean bloqueantes sino simultaneas

    res.json( 
        { 
        total,    
        usuarios
    } )
}

const usuariosPost = async(req = request, res = response)=> {
   
    const {nombre, password, correo} = req.body;
    
    const usuarioExiste = await Usuario.findOne({ nombre })

    if(usuarioExiste) return res.status(400).json({msg: `El usuario ya existe` })

    const usuario = await new Usuario( {nombre, password, correo} )

    //Encriptar contrasenia
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync( password ,salt )


    res.status(200).json(
        {
        msg: `Usuario ${nombre} registrado con éxito`,
        usuario
    })
    await usuario.save();
}

const usuariosPut = async function (req = request, res = response) {
    const { id } = req.params
    const {_id, password, correo, ...resto} = req.body
    
    if(password){
        //Encriptar contrasenia   
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync( password ,salt )
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(
        {msg: 'Usuario modificado',
        usuario
    })
}

const usuariosDelete = async function (req = request, res = response) {
    const { id } = req.params
    const query = {estado: false}
    
    // const usuario = await Usuario.findByIdAndDelete( id )

    const usuario = await Usuario.findByIdAndUpdate(id, query);

    // const usuarioAutenticado = req.usuario

    if(!usuario) res.status(400).json({msg: `El usuario ${usuario.nombre} no existe`})

    if(!(usuario.estado)) res.status(400).json({msg: `El usuario ${usuario.nombre} ya ha sido elimiado`})

    res.json(
        {msg: 'Usuario eliminado correctamente',
        usuario
        // usuarioAutenticado
    })
}

module.exports = { usuariosGet, usuariosDelete, usuariosPost, usuariosPut, obtenerUsuarioPorNombre }