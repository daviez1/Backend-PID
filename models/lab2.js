const { Schema, model } = require('mongoose');

const Laboratorio2 = Schema({
    dispositivo: {
      type: String,
      required: [true, 'El dispositivo es obligatorio'],
    },
    estado: {
      type: Boolean,
      default: true,
    },
    marca:{
      type: String,
      required: [true, 'La marca del dispositivo e obligatoria']
    }
});

Laboratorio2.methods.toJSON = function() {
  const { __v, estado, ...data  } = this.toObject();
  return data;
}


module.exports = model( 'Laboratorio2', Laboratorio2 );