
const coleccionesPermitidas = require('./dbValidator')
const dbValidators = require('./dbValidator');
const generarJWT   = require('./generarJWT');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...subirArchivo,
    ...coleccionesPermitidas
}