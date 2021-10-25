const mongoose = require("mongoose");

const ventaSchema = mongoose.Schema({
    fecha: {
        type: String,
        required: true
    },
    idVenta: {
        type: Number,
        required: true
    },
    nombreCliente: {
        type: String,
        required: true
    },
    tipoIdentificacion: {
        type: String,
        required: true
    },
    numeroIdentificacion: {
        type: Number,
        required: true
    },
    nombreVendedor: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('venta',ventaSchema);