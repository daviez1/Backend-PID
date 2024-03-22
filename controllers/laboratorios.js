const { response } = require("express");
const Laboratorios = require('../models/Laboratorios')

const obtenerLaboratorios = async ( req, res = response ) => {

  const laboratorios = await Laboratorios.find()
  
  res.json({
    laboratorios
  });
}


// const obtenerLaboratorio = async ( req, res = response ) => {

//   let { dispositivo } = req.params;

//   if(dispositivo) dispositivo = dispositivo.toUpperCase()

//   const medio = await Laboratorio1.find( { dispositivo: dispositivo} )

//   res.json( medio );
// }


const crearLaboratorio = async ( req, res = response ) => {

  let { estado, numero } = req.body;

  const laboratorioExiste = await Laboratorios.findOne( { numero } );

  if( laboratorioExiste ){
    return res.status(400).json({
      msg:`El laboratorio ${numero} ya existe`
    })
  }

  // Generar la data a guardar
  
  // const data = {
  //   ...body,
  //   dispositivo :body.dispositivo.toUpperCase(),
  // }

  // console.log(data)

  const laboratorio = new Laboratorios( { numero } );

  // Guardar DB
  await laboratorio.save();

  res.status(201).json( laboratorio )
}


const actualizarLaboratorio = async  ( req, res = response ) => {

  const { id } = req.params;
  const { estado, ...data } = req.body;

  const laboratorio = await Laboratorios.findByIdAndUpdate( id , data, {new: true} );

  res.json( laboratorio );
}


const borrarLaboratorio = async  ( req, res = response ) => {

  const { id } = req.params;
  const laboratorio = await Laboratorios.findByIdAndUpdate( id, { estado: false }, { new: true });

  res.json(laboratorio);
}

module.exports = {
  crearLaboratorio,
  obtenerLaboratorios,
  actualizarLaboratorio,
  borrarLaboratorio
}