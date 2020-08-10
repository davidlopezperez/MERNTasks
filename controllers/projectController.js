
const Project = require('../models/Project');
const {validationResult} = require('express-validator')

exports.createProject = async (req, res) => {

    //Revisar si hay errores
      //Revisar si hay errores

      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors : errors.array()})
      }

    try {
        //Crear un nuevo proyecto

        const project = new Project(req.body);
        //Guardar el creador via jwt
        project.author = req.user.id;
        
        //Guardamos el proyecto
        project.save();
        res.json(project);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//Obtener los proyectos del usuario autenticado

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({author: req.user.id});
        res.json({projects});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error interno')
    }
}

//Actualiza un proyecto

exports.actProject = async (req, res) => {
    
    //Revisar si hay errores
      //Revisar si hay errores

      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors : errors.array()})
      }

      //Extraer la información del proyecto

      const {projectname} = req.body;
      const newProject = {};

      if(projectname){
        newProject.projectname =projectname;
      }

      try {
          
        //Primero hay que revisar el ID
        let project = await Project.findById(req.params.id);
        //Revisar que exista un proyecto
        if(!project){
            return res.status(404).json({msg: 'Proyecto inexistente'});
        }
        //Revisar y verificar el creador del proyecto
        if(project.author.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado'})
        }


        //Finalmente se actualiza
        project = await Project.findOneAndUpdate({_id: req.params.id}, {$set : newProject}, {new: true});

        res.json({project});

      } catch (error) {
          console.log(error);
          res.status(500).send('Error interno');
      }
}

//Eliminar un proyecto según su ID

exports.deleteProject = async (req, res) => {
    try {
        
           //Primero hay que revisar el ID
           let project = await Project.findById(req.params.id);
           
           //Revisar que exista un proyecto
           if(!project){
               return res.status(404).json({msg: 'Proyecto inexistente'});
           }
           //Revisar y verificar el creador del proyecto
           if(project.author.toString() !== req.user.id){
               return res.status(401).json({msg: 'No autorizado'})
           }

           //Eliminar el proyecto
           await Project.findOneAndRemove({_id : req.params.id});
           
           res.json({msg: 'Proyecto eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}