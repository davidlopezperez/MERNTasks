const User = require('../models/Users');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
      //Revisar si hay errores

      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors : errors.array()})
      }

      //Extraer el email y el password del req

      const {email, password} = req.body;

      try {
          //Revisar que haya un usuario en la base de datos registrado con ese email

          let user = await User.findOne({email});
          if(!user){
            return res.status(400).json({msg: 'El usuario no existe'});
          }

          //Revisar su password
          const rightPass = await bcryptjs.compare(password, user.password);
          if(!rightPass){
              return res.status(400).json({msg: 'Password incorrecto'});
          }

          //Si todo es correcto creamos el jason web token
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
          console.log(error);
      }
}

//Obtiene el usuario que esta autenticado

exports.authenticUser = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}
