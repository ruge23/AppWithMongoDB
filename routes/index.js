const express = require('express');


const router = express.Router();

// Primer Pagina
router.get('/', (req, res)=>{
    res.render('selectName', { nombre: null});
})





module.exports = router;