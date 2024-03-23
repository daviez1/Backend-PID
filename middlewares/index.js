
const  validarCampo  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validarJWT');
const  validarRole  = require('../middlewares/validarRole');
const  validarArchivoSubir  = require('../middlewares/validar-archivo');

module.exports = {
  ...validarCampo,
  ...validarJWT,
  ...validarRole,
  ...validarArchivoSubir
}