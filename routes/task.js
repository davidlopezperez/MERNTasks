const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


//crear una tarea
//url api/tasks
router.post('/',
    auth,
    [   
        check('project', 'Debe existir algún proyecto').not().isEmpty(),
        check('taskname', 'La tarea debe tener un nombre').not().isEmpty()
    ],  
    taskController.createTask
);

//Obtener las tareas por proyectos
//url api/tasks

router.get('/',
    auth,
    taskController.getTaskByProjects
);

//Actualizar la tarea
router.put('/:id',
    auth,
    taskController.actTask
);

//Borrar una tarea por su id
router.delete('/:id',
    auth,
    taskController.deleteTask
)

module.exports = router;