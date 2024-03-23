// C:\Users\David\Desktop\Programacion\Desarrollo Web\Node js\node.js HArold\01-restserver ( FH )\node_modules\express\lib\router\route.js:211
//         throw new Error(msg);
//         ^

// Error: Route.post() requires a callback function but got a [object Object]
//     at Route.<computed> [as post] (C:\Users\David\Desktop\Programacion\Desarrollo Web\Node js\node.js HArold\01-restserver ( FH )\node_modules\express\lib\router\route.js:211:15)
//     at proto.<computed> [as post] (C:\Users\David\Desktop\Programacion\Desarrollo Web\Node js\node.js HArold\01-restserver ( FH )\node_modules\express\lib\router\index.js:521:19)
//     at Object.<anonymous> (C:\Users\David\Desktop\Programacion\Desarrollo Web\Node js\node.js HArold\01-restserver ( FH )\routes\user.js:30:8)      
//     at Module._compile (node:internal/modules/cjs/loader:1376:14)
//     at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
//     at Module.load (node:internal/modules/cjs/loader:1207:32)
//     at Module._load (node:internal/modules/cjs/loader:1023:12)
//     at Module.require (node:internal/modules/cjs/loader:1235:19)
//     at require (node:internal/modules/helpers:176:18)
//     at Server.routes (C:\Users\David\Desktop\Programacion\Desarrollo Web\Node js\node.js HArold\01-restserver ( FH )
//     \models\server.js:56:36) que es esto
// Copilot
// El error que estás viendo es común en Express, un marco de aplicación web para Node.js. El error Route.post() requires a 
// callback function but got a [object Object] significa que Express espera una función de devolución de llamada
//  (callback function) para manejar la ruta POST, pero en su lugar recibió un objeto12.

// Este error puede ocurrir si estás intentando pasar un objeto donde Express espera una función. Por ejemplo, si estás exportando
//  un objeto desde un módulo y luego intentas usar ese objeto como una función de devolución de llamada en una ruta POST1.

// Para solucionar este problema, asegúrate de que estás pasando una función de devolución de llamada válida a Route.post().
//  Si estás exportando un objeto desde un módulo, puedes intentar cambiar la exportación para que sea una función en lugar de
//   un objeto1.

// Si el problema persiste, te recomendaría que revises tu código cuidadosamente para asegurarte de que estás pasando las funciones
//  de devolución de llamada correctas a tus rutas POST12. También podría ser útil buscar más detalles sobre el error específico 
//  en sitios de preguntas y respuestas de programación.


// Solucion: ValidarCampo era un objeto