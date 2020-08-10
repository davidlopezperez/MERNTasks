//Creando el servidor con express
const express = require('express');
const connectDataBase = require('./config/db');
const cors = require('cors');

//Crear el servidor siguiendo estos pasos
const app = express();

//Conectamos con la base de datos
connectDataBase();

//HABILITAMOS CORS, cors permite el intercambio de datos entre los dominios diferentes, en este caso el backend y el frontend

app.use(cors());

//Habilitar express.json
app.use(express.json({extended:true}));

//Crear el puerto
//puerto de la app
const PORT = process.env.PORT || 4000;

//Importar las rutas
//Todas estas rutas estan dentro de la carpeta routes que a su vez tienen los verbos para las peticiones http
//con sus validaciones y consideraciones para poder ser enrutadas.
//a su vez esos endpoints cuentan con metodos definidos en el controller.
//El controller se encarga de realizar todas las validaciones para dar acceso a las rutas a las que se le realiza la petición
//cuando hablo de peticiones, me refiero a los verbos http, 'get', 'post', 'put' y 'delete'. esos metodos o funciones
//los encuentro dentro de la carpeta controller, en los diferentes archivos de las diferentes rutas.


app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/project'));
app.use('/api/tasks', require('./routes/task'));
//Definir la pagina principal

// app.get('/', (req, res) => {
//     res.send('Hola mundo');
// })
//arrancar el app (el servidor)
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
