const express = require('express');
const Pokemon = require('../models/pokemon')
const Ataque = require('../models/ataques')
const Comentarios = require('../models/comentarios')

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
        res.redirect(`/${req.params.nombre}/pokemon/${poke.nombre}`)
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

// editar pokemon
router.get('/:nombre/edit/:pokemon', (req, res)=>{
    Pokemon.findOne({nombre: req.params.pokemon}, (err, poke)=>{
        res.render('editPokemon', {
            pokemon: poke,
            nombre: req.params.nombre,
        })
    })
})

router.post('/:nombre/edit/:pokemon',(req, res)=>{
    Pokemon.update({nombre: req.params.pokemon}, req.body, (err, data)=>{
        res.redirect(`/${req.params.nombre}/pokemon/${req.body.nombre}`)
    })
})

// Borrar pokemon
router.post('/:nombre/delete/:pokemon', (req, res)=>{
    Pokemon.remove({nombre: req.params.pokemon}, (err)=>{
        if(err) return err;
        res.redirect(`/${req.params.nombre}/pokemon`);
    })
})

// Agregar ataque
router.get('/:nombre/newAttack/:pokemon', (req, res)=>{
    res.render('addAttack',{
        nombre: req.params.nombre,
        pokemon: req.params.pokemon
    })
})

router.post('/:nombre/newAttack/:pokemon', (req, res)=>{
    Ataque.create(req.body, (err, attack)=>{
        console.log('ataque',attack)
        Pokemon.update({nombre: req.params.pokemon}, {$push: {ataque: attack}}, (err, pokemon)=>{
            res.redirect(`/${req.params.nombre}/pokemon/${req.params.pokemon}`);
        })
    })
})


module.exports = router;