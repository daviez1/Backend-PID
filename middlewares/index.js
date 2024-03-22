
const  validarCampo  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validarJWT');
const  validarRole  = require('../middlewares/validarRole');

module.exports = {
  ...validarCampo,
  ...validarJWT,
  ...validarRole
}