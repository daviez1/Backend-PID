
const path = require('path');
const  {  v4 : uuidv4  }  =  require ( 'uuid' ) ; 

const subirArchivo = ( files, extensionValidas = ["png", "jpg", "jpeg"], carpeta = '' ) => {

  return new Promise(( resolve, reject ) => {

    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar la extension
    // const extensionValidas = ["png", "jpg", "jpeg"];
    if (!extensionValidas.includes(extension)) {
      return reject( `la extension ${extension} no es permitida` );
    }

    const nombreTem = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta ,nombreTem);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      } 

      resolve(nombreTem) ;

    });
  });
};

module.exports = {
  subirArchivo,
};
