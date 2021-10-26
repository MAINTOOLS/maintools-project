const express = require("express");
const ventaSchema = require("../models/venta_model");

const router = express.Router();

// Crear venta
router.post('/ventas',(req,res) => {
    //res.send("Crear venta");
    const venta = ventaSchema(req.body);
    venta.save()
    .then((data) => res.json(data))
    .catch((error)=>res.json({message:error}));
    //res.send("correcto")
    
});

// obtener todas las ventas
router.get('/listaventas',(req,res) => {
    //res.send("Crear venta");
    ventaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=>res.json({message:error}));
    
});

//obtener solo una venta
router.get('/ventas/editar/:id',(req,res) => {
    //res.send("Crear venta");
    const{id} = req.params;
    ventaSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error)=>res.json({message:error}));
    //console.log(ventaSchema)
});

//actualizar una venta
router.put('/ventas/:id',(req,res) => {
    //res.send("Crear venta");
    const{id} = req.params;
    const{fecha, idVenta, nombreCliente, tipoIdentificacion, numeroIdentificacion, nombreVendedor} = req.body;
    ventaSchema
    .updateOne({_id:id},{ $set:{fecha, idVenta, nombreCliente, tipoIdentificacion, numeroIdentificacion, nombreVendedor}})
    .then((data) => res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Eliminar una venta
router.delete('/ventas/:id',(req,res) => {
    //res.send("Crear venta");
    const{id} = req.params;
    ventaSchema
    .remove({_id:id})
    .then((data) => res.json(data))
    .catch((error)=>res.json({message:error}));
});


//obtener cantidad de documentos
router.get('/ventas/cantidad',async (req,res) => {
    //res.send("Crear venta");
    var numeroVentas
    await ventaSchema.collection.countDocuments()
    .then(function(numItems) {
      numeroVentas = numItems
        
  }).catch(err => console.log(err))
  res.send({
    NumVentas: numeroVentas
  })
});

router.route('/ventas/cantidades').get(function(req,res){

    ventaSchema.count( {}, function(err, result){

        if(err){
            res.send(err)
        }
        else{
            res.json(result)
        }

   })


})

module.exports = router;