const express = require('express');
const Pokemon = require('../models/pokemon')

const router = express.Router();

// Primer Pagina
router.get('/', (req, res)=>{
    res.render('selectName', { nombre: null});
})

// saludo
router.post('/',(req, res)=>{
    res.redirect(`/${req.body.nombre}`)
})

router.get('/:nombre', (req, res)=>{
    res.render('index', { nombre: req.params.nombre })
})

//listado de pokemones
router.get('/:nombre/pokemon',(req, res)=>{
    Pokemon.find({}, (err, arrPokemons)=> {
        if(err) return err;
        const message = arrPokemons.length ? '' : 'no hay pokemones';
        res.render ('pokemonList',{
            nombre: req.params.nombre,
            mensaje: message,
            pokemon : arrPokemons,
        })
    })
})




module.exports = router;