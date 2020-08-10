const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});
//Requerimos el string de conexión

const connectDataBase = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB CONNECTED');
            
    } catch (error) {
        console.log(error);
        process.exit(1); //Esta funcion detiene la app
    }
}

module.exports = connectDataBase;