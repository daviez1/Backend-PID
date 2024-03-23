const Role = require("../models/rol");
const User = require("../models");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await User.findOne({ correo });
  if ( existeEmail ) {
    throw new Error(`El email ${correo} ya esta registrado`);
  }
};

const existeUsuarioxID = async ( id ) => {
  const existeUsuario = await User.findById( id );
  if ( !existeUsuario ) {
    throw new Error(`El ID ${id} no existe aaa`);
  }
};


// validar colecciones permitidas
const coleccionPermitidas = ( coleccion = '', colecciones = [] ) =>{

  const incluida = colecciones.includes( coleccion );
  if( !incluida ){
    throw new Error(`la coleccion ${coleccion} no es permitida`);
  }
  return true;
}

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioxID,
  coleccionPermitidas
};
