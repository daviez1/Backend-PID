const { response } = require("express")

const esAdminRole = ( req, res = response, next ) => {

  if( !req.user ){
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin verificar el token'
    })
  }
  
  const { rol } = req.user

  if( rol !== 'ADMIN_ROLE' ){
    return res.status(401).json({
      smg: 'No tienes permisos - admin'
    })
  }

  next(); 
}


const tieneRole = ( ...roles ) => {

  return ( req, res = response, next ) => {

    if( !req.user ){
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin verificar el token'
      })
    }

    if( !roles.includes( req.user.rol )){
      return res.status(401).json({
        msg: 'No tienes permisos - roles'
      })
    }

    next(); 
  }
  
}

module.exports = {
  esAdminRole,
  tieneRole
}