const express = require('express');


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






module.exports = router;