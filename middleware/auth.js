const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //Leer el token del header
    const token = req.header('x-auth-token');


    //Revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'Permiso denegado'});
    }

    //Validar el token
    try {
        const cifrated = jwt.verify(token, process.env.SECRET);
        req.user = cifrated.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Error de autenticación'})
    }
}