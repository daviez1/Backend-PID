const { Router, response } = require('express')
const { check } = require('express-validator')

const { obtenerLaboratorios, crearLaboratorio, actualizarLaboratorio, borrarLaboratorio } = require('../controllers/laboratorios')
const { validarCampo } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt')
// const { esAdminRole } = require('../middlewares/validar-por-rol')

const router = Router()

router.get('/', obtenerLaboratorios)

// router.get('/:dispositivo',obtenerMedio)

router.post('/', [
    // validarJWT,
    // esAdminRole,
    check('numero', 'El numero es obligatorio').not().isEmpty(),
    validarCampo
], crearLaboratorio)

router.put('/:numero', 
[
//     // validarJWT,
//     // // esAdminRole,
    check('dispositivo', 'El dispositivo es obligatorio').not().isEmpty(),
    check('marca', 'La marca es obligatoria').not().isEmpty(),
    validarCampo
],
actualizarLaboratorio)

router.delete('/:id', [
    // validarJWT,
    // esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    validarCampo
], borrarLaboratorio)


module.exports = router