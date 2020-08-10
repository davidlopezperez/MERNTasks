const User = require('../models/Users');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
    
    //Revisar si hay errores

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    //Extraer email y password
    const {email, password} = req.body;

    try {

        //Revisar que el usuario registrado sea único

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        //crea el nuevo usuario
        user = new User(req.body);

        //Hashear el password

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);


        //Guarda el usuario

        await user.save();
        //Crear y firmar el jason web token
        const payload = {
            user: {
                id: user.id
            }
        };

        //Firmar el jason web token

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.json({token: token});
        });

        

    } catch (error) {
        console.log('hubo un error' + error);
        res.status(400).send('Hubo un error');
    }
}