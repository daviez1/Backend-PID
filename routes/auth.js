const { Router } = require('express')
const { check } = require('express-validator')

const { login } = require('../controllers/auth')
const { validarCampo } = require('../middlewares')

const router = Router()

router.post('/login',[  
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validarCampo
] , login)

module.exports = router