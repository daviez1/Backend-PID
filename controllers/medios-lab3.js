const { response } = require("express");
const Laboratorio3 = require('../models/lab3')

const obtenerMedios = async ( req, res = response ) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true }
  
  const [ total, medios ] = await Promise.all([
    Laboratorio3.countDocuments( query ),
    Laboratorio3.find( query )
      .skip( Number( desde ))
      .limit(Number( limite ))
  ])
  
  res.json({
    msg: `Hay ${total} medios en el laboratorio 3`, 
    medios
  });
}


const obtenerMedio = async ( req, res = response ) => {

  let { dispositivo } = req.params;

  if(dispositivo) dispositivo = dispositivo.toUpperCase()

  const medio = await Laboratorio3.find( { dispositivo: dispositivo} )


  res.json( medio );
}


const crearMedio = async ( req, res = response ) => {

  let { estado, dispositivo, marca } = req.body;

  if( dispositivo ){
    dispositivo = dispositivo.toUpperCase();
  }

  const medio = await Laboratorio3.findOne( {dispositivo} );

  // if( medio ){
  //   return res.status(400).json({
  //     msg:'El medios ya existe'
  //   })
  // }

  // Generar la data a guardar
  
  // const data = {
  //   ...body,
  //   dispositivo :body.dispositivo.toUpperCase(),
  // }

  // console.log(data)

  const medios = new Laboratorio3( {dispositivo, marca} );

  // Guardar DB
  await medios.save();

  res.status(201).json(medios)
}


const actualizarMedio = async  ( req, res = response ) => {

  const { id } = req.params;
  const { estado, ...data } = req.body;

  if( data.dispositivo ){
    data.dispositivo = data.dispositivo.toUpperCase();
  }

  const medios = await Laboratorio3.findByIdAndUpdate( id , data, {new: true} );

  res.json(medios);
}


const borrarMedio = async  ( req, res = response ) => {

  const { id } = req.params;
  const medio = await Laboratorio3.findByIdAndUpdate( id, { estado: false }, { new: true });

  res.json(medio);
}

module.exports = {
  crearMedio,
  obtenerMedio,
  obtenerMedios,
  actualizarMedio,
  borrarMedio
}