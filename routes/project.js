const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crea proyectos
//api/projects
router.post('/',
    auth,
    [
        check('projectname', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],  
    projectController.createProject    
);

//Obtener todos los proyectos creados por el usuario que este autenticado
router.get('/',
    auth,
    projectController.getProjects

    
)

//Actualizar un proyecto via ID
router.put('/:id',
    auth,
    [
        check('projectname', 'No hay proyectos para actualizar').not().isEmpty()
    ],
    projectController.actProject
);

//Eliminar un proyecto
router.delete('/:id',
    auth,
    projectController.deleteProject
);

module.exports = router;