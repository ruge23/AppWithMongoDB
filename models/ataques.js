const mongoose = require('mongoose');

const ataqueSchema = mongoose.Schema({
    nombre: String,
    danio: Number,
    tipo: String,
})

const Ataque = mongoose.model('ataques', ataqueSchema);

module.exports = Ataque;