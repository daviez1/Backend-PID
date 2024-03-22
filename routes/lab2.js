const { Router, response } = require('express')
const { check } = require('express-validator')

const { actualizarMedio,borrarMedio,crearMedio,obtenerMedio,obtenerMedios } = require('../controllers/medios-lab2')
const { validarCampo } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt')
// const { esAdminRole } = require('../middlewares/validar-por-rol')

const router = Router()

router.get('/', obtenerMedios)

router.get('/:dispositivo',obtenerMedio)

router.post('/', [
    // validarJWT,
    // esAdminRole,
    check('dispositivo', 'El dispositivo es obligatorio').not().isEmpty(),
    check('marca', 'La marca es obligatoria').not().isEmpty(),
    validarCampo
], crearMedio)

router.put('/:id', 
[
//     // validarJWT,
//     // // esAdminRole,
    check('dispositivo', 'El dispositivo es obligatorio').not().isEmpty(),
    check('marca', 'La marca es obligatoria').not().isEmpty(),
    validarCampo
],
actualizarMedio)

router.delete('/:id', [
    // validarJWT,
    // esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    validarCampo
], borrarMedio)


module.exports = router