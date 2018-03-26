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

//agregar un pokemon
router.get('/:nombre/newPokemon', (req, res)=>{
    res.render('addPokemon',{nombre: req.params.nombre})
})

router.post('/:nombre/newPokemon', (req, res)=>{
    console.log(req.body);
    Pokemon.create(req.body, (err, poke)=>{
        if(err) return res.send(err);
        res.redirect(`${req.params.nombre}/pokemon/${poke.nombre}`)
    })
})

// Perfil pokemon
router.get('/:nombre/pokemon/:pokemon', (req, res)=>{
    Pokemon.findOne({nombre: req.params.pokemon})
        .exec((err, poke)=>{
            if(err) return err;
            console.log('pokemon', poke)
            res.render('pokemonProfile',{
                pokemon: poke,
                nombre: req.params.nombre,
            })
        })
})




module.exports = router;