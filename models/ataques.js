const mongoose = require('mongoose');

const ataqueSchema = mongoose.Schema({
    nombre: String,
    tipo: String,
    danio: Number,
})

const Ataque = mongoose.model('ataques', ataqueSchema);

module.exports = Ataque;