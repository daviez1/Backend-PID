const { Router } = require('express')
const { check } = require('express-validator')

const {validarCampo} = require('../middlewares')

const router = Router()

const { usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut, 
    obtenerUsuarioPorNombre
} = require('../controllers/usuarios') 

router.get('/', usuariosGet)

router.get('/:nombre',obtenerUsuarioPorNombre)

router.post('/',[
    check('correo', 'El correo no es valido').isEmail(),  //para negar check('correo', 'El correo no es valido').not().isEmail()    
    check('nombre','Ese nombre no es valido').not().isEmpty(),
    check('password','La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    validarCampo
] ,usuariosPost)

router.put('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    validarCampo
], usuariosPut)

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validarCampo
] ,usuariosDelete) 


  module.exports = router