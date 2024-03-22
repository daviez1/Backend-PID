const { response, json } = require("express");
const path = require("path");
const fs = require("fs");
const { subirArchivo } = require("../helpers/subir-archivo");
const Usuario = require("../models/user");
const Producto = require("../models/producto");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "ddsfbz6wq",
  api_key: "859687261894579",
  api_secret: "bxevAajSzilFCFpZbPa17JNPDY8",
});

const cargarArchivo = async (req, res = response) => {
  try {
    // txt, md
    // const nombre = await subirArchivo( req.files, [ 'txt', 'md' ], 'textos' );

    // Imagenes
    const nombre = await subirArchivo(req.files, undefined, "imgs");

    res.json({
      nombre,
    });
  } catch (msg) {
    res.status(400), json({ msg });
  }
};

const actualizarImg = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvido validar esto",
      });
  }

  // Limpiar imagenes previas
  if (modelo.img) {
    // hay que borrar la imagen del servidor
    const pathImg = path.join(__dirname, "../uploads", coleccion, modelo.img);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);

  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};

const actualizarImgCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;
  console.log(req)
  console.log(req.files)
  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvido validar esto",
      });
  }

  // Limpiar imagenes previas
  if (modelo.img) {
    // hay que borrar la imagen de Cloudinary
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");

    cloudinary.uploader.destroy(public_id);
  }
  
  const { tempFilePath } = req.files.archivo;
  // ELIMINAR FONDO //////////////////////////////////////////////////////
  const axios = require("axios");
  const FormData = require("form-data");
  const fs = require("fs");
  let img;
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append(
    "image_file",
    fs.createReadStream(tempFilePath),
    path.basename(tempFilePath)
  );

  await axios({
    method: "post",
    url: "https://api.remove.bg/v1.0/removebg",
    data: formData,
    responseType: "arraybuffer",
    headers: {
      ...formData.getHeaders(),
      "X-Api-Key": "Nt2ALaQoHSx98ZruDsbC62v",
    },
    encoding: null,
  })
    .then(async (response) => {
      fs.writeFileSync("no-bg.png", response.data);
      img = Buffer.from(response.data, "base64");
      // Mostrar img en la res
      //console.log(response.data)
      //res.set('Content-Type', 'image/png'); res.set('Content-Length', img.length);
      //res.send(img);

      // subir Buffer a cloudinary 
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          height: 400,
          width: 300,
          crop: "fill",
        },
        function (error, result) {
          if (result) {
            res.status(200).json({
              msg: "subida exitosa a Cloudinary",
              url: result.secure_url,
            });
          }
        }
      );

      streamifier.createReadStream(img).pipe(cld_upload_stream);

    })
    .catch((error) => {
      console.log(error);
      cloudinary.uploader.upload(
        tempFilePath,
        {
          height: 400,
          width: 300,
          crop: "fill",
        },
        function (error, result) {
          if (error) {
            console.log(error);
            res.status(400).json({
              msg: "error al subir la imagen",
            });
          } else {
            res.status(200).json({
              msg: "subida exitosa a Cloudinary NO se pudo remover el fondo",
              url: result.secure_url,
            });
          }
        }
      );
    });

  /////////////////////////////////////////////////////////////////////////
};

const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvido validar esto",
      });
  }

  // verificar si existe la imagen
  if (modelo.img) {
    // Subir la imgen
    const pathImg = path.join(__dirname, "../uploads", coleccion, modelo.img);
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  }

  /* res.json(
    { msg:'falta place holder' }
  ) */

  // mostrar una imagen cuando el producto no tenga img
  const pathImg = path.join(__dirname, "../assets/14.1 no-image.jpg");
  res.sendFile(pathImg);
};

module.exports = {
  cargarArchivo,
  actualizarImg,
  mostrarImagen,
  actualizarImgCloudinary,
};
