const { Schema, model } = require('mongoose');

const LaboratoriosSchema = Schema({
    numero:{
        type: Number,
        required: ['true', 'El numero del laboratorio es obligatorio']
    },
    estado: {
      type: Boolean,
      default: true,
    },
    // img:
});

LaboratoriosSchema.methods.toJSON = function() {
  const { __v, estado, ...data  } = this.toObject();
  return data;
}


module.exports = model( 'Laboratorios', LaboratoriosSchema );