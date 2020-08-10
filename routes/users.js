//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {check} = require('express-validator');
//Crea un usuario y su endpoint va a ser /api/users
router.post('/',
    [
        check('username', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe contener de 6 a 10 caracteres').isLength({min: 6, max: 10})
    ], 
    userController.createUser
    
);


module.exports = router;