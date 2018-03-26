const mongoose = require('mongoose');

const comentariosSchema = mongoose.Schema({
    autor: String,
    texto: String,
    fecha : {
        type: Date,
        default: Date.now
    },
})

const Comentarios = mongoose.model('comentarios', comentariosSchema);

module.exports = Comentarios;