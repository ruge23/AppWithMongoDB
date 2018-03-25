const mongoose = require('mongoose');

const pokemonSchema = mongoose.Schema({// Antes de poder escribir en la BD, tenenmos que definir un modelo
    nombre: String,                     //para los datos
    tipo: String,                       //Basicamente decime el nombre y el tipo de dato que vamos a necesitar
    imgURL: String,
    level : Number,
    ataque: [{ type: mongoose.Schema.Types.ObjectId, ref : 'ataques'}],
    comentarios : [{ type: mongoose.Schema.Types.ObjectId, ref : 'comentarios'}]
})

const Pokemon = mongoose.model('pokemons', pokemonSchema);// Creamos una clase Pokemon basado en el modelo que definimos
                                                            // este objeto va a tener todo el comportamiento mongoose
module.exports = Pokemon;