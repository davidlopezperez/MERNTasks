//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');


//autenticando un usuario  y su endpoint va a ser /api/auth
router.post('/',
    authController.authUser
    
);

router.get('/',
    auth,
    authController.authenticUser
);


module.exports = router;