// const { Router } = require('express')
// const { check } = require('express-validator')

// const { emailExiste, esRolValido, existeUsuarioxID } = require('../helpers/dbValidator')

// const validarCampo = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validarJWT')
// const { esAdminRole, tieneRole } = require('../middlewares/validarRole')
// // const { validarPorRol } = require('../middlewares/validar-por-rol')

// const router = Router()

// const { userGet,
//     userPut,
//     userPost,
//     userDelete, 
// } = require('../controllers/user') 

// // router.get('/api/usuarios', function (req, res) {
// //     res.send('Hola')
// // })

// router.get('/', userGet)

// // router.get('/:nombre', [
// //         validarJWT,
// //         esAdminRole
// // ],obtenerUsuarioPorNombre)

// router.post('/',[
//     tieneRole,
//     check('correo', 'El correo no es valido').isEmail(),  //para negar check('correo', 'El correo no es valido').not().isEmail()    
//     check('nombre','Ese nombre no es valido').not().isEmpty(),
//     check('password','La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
//     validarCampo
// ] , userPost)

// router.put('/:id',[
//     validarJWT,
//     esAdminRole,
//     check('id', 'No es un id válido').isMongoId(),
//     check('id').custom( existeUsuarioxID ),
//     check('rol').custom( tieneRole ),
//     validarCampo
// ], userPut)

// router.delete('/:id', [
//     validarJWT,
//     esAdminRole,
//     check('id', 'No es un id válido').isMongoId(),
//     check('id').custom( existeUsuarioxID ),
//     validarCampo
// ] ,userDelete) 


//   module.exports = router