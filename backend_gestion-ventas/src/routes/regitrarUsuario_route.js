const express = require("express");
const registrarSchema = require("../models/registrar_usuaio");
const router = express.Router();

// Insertar registro usuario
router.post("/user", (req, res) => {
  const registrar = registrarSchema(req.body);
  registrar
    .save()
    .then((data) => res.json(data))
    .catch((error) => ({ message: error }));
});
// Consultar usuario
router.get("/user", (req, res) => {
  // para get solo usamos el esquema
  registrarSchema
    .find() // para recuperar los productos
    .then((data) => res.json(data)) // promesa para responder con esos datos
    .catch((error) => res.json({ message: error })); // recoger si hay algun error
});

//Consultar un usuario usando el correo electronico
router.get("/user/consultar/:Correo", (req, res) => {
  const {Correo} = req.params
  registrarSchema    
    .find({Correo: Correo}) // para recuperar los productos
    .then((data) => res.json(data)) // promesa para responder con esos datos
    .catch((error) => res.json({ message: error })); // recoger si hay algun error
});

//testeo countDocument
router.get("/user/consultar/cuenta", (req, res) => {
  console.log("hola")
  registrarSchema.count({Correo:"attilathehun96@gmail.com"})
  .then((data) => res.json(data))
  
});

// Consultar solo con el indice
router.get("/user/:id", (req, res) => {
  const { id } = req.params; // obtenemos el id desde los parametros
  registrarSchema // para get solo usamos el esquema
    .findById(id) // para encontrar el id
    .then((data) => res.json(data)) // promesa para responder con esos datos
    .catch((error) => res.json({ message: error })); // recoger si hay algun error
});



// Actualizar un producto
router.put("/user/:id", (req, res) => {
  const { id } = req.params; // obtenemos el id desde los parametros
  const { nombre, apellido, Correo, estado_usuaio, estado , rol} = req.body; //Extraer los datos que queremos actualizar del producto
  registrarSchema // para get solo usamos el esquema
    .updateOne(
      { _id: id },
      { $set: { nombre,apellido ,Correo, estado_usuaio, estado, rol} }
    ) // para actualizar el id
    .then((data) => res.json(data)) // promesa para responder con esos datos
    .catch((error) => res.json({ message: error })); // recoger si hay algun error
});

module.exports = router;
