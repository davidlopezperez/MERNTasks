const Task = require('../models/Task');
const Project = require('../models/Project');
const {validationResult} = require('express-validator');
const router = require('../routes/users');
const { getProjects } = require('./projectController');
//Crear una nueva Tarea

exports.createTask = async (req, res) => {
    
        //Revisar si hay algun error
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors : errors.array()})
      }

      //Extraer el proyecto y comprobar si existe
      
      try {
        const {project} = req.body;
        const isProject = await Project.findById(project);
        if(!isProject){
            return res.status(404).json({msg : 'Proyecto inexistente'});
        }

        //Revisar si el proyecto actual le pertenece al usuaroi autenticado
        if(isProject.author.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        const task = new Task(req.body);
        await task.save();
        res.json({task});
          
      } catch (error) {
          console.log(error);
          res.status(500).send('Error interno');
      }
};

//Metodo que obtiene las tareas dentro de un proyecto.
exports.getTaskByProjects = async (req, res) => {
     
    
        //Revisar si hay algun error
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors : errors.array()})
      }

      try {
        const {project} = req.query;
        const isProject = await Project.findById(project);
        if(!isProject){
            return res.status(404).json({msg : 'Proyecto inexistente'});
        }

        //Revisar si el proyecto actual le pertenece al usuaroi autenticado
        if(isProject.author.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //Obtener las tareas por proyectos
        const tasks = await Task.find({ project });
        res.json({tasks})
      } catch (error) {
          console.log(error);
          res.status(500).send('Hubo un error');
      }
}

//Actualizar una tarea

exports.actTask = async (req, res) => {

    try {
        //Extraer las propiedades de la tarea
        const {project, taskname, state} = req.body;
        
        //Si la tarea existe o no

        let task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({msg: 'Tarea inexistente'});
        }
        
        
        //Extraer el proyecto
        const isProject = await Project.findById(project);
        //Revisar si el proyecto actual le pertenece al usuaroi autenticado
        if(isProject.author.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //Crear un objeto con la nueva información

        const newTask = {};
        
        newTask.taskname = taskname;
        newTask.state = state;
        

        //Guardar la tarea actualizada
        task = await Task.findByIdAndUpdate({_id: req.params.id}, newTask, {new: true});

        res.json({task});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

//Borrar una tarea
exports.deleteTask = async (req, res) =>{
    
    try {
        //Extraer las propiedades de la tarea
        const {project} = req.query;

        //Si la tarea existe o no

        let task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({msg: 'Tarea inexistente'});
        }
               
        //Extraer el proyecto
        const isProject = await Project.findById(project);
        
        //Revisar si el proyecto actual le pertenece al usuaro autenticado
        
        if(isProject.author.toString() !== req.user.id){
             
            return res.status(401).json({msg: 'No autorizado'})
        }

        //Borrar la tarea ya habiendo pasado todas las validaciones
        await Task.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'tarea eliminada'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}