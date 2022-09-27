// Importamos el modelo
const TaskModel = require('../models/TASKS');

// Inicializamos el objeto CtrlTask
const ctrlTask = {};

ctrlTask.getTasks = async (req, res) => {
    const Tasks = await TaskModel.find({isActive:true});//devuelve solo las tareas que tengan su propiedad isActive en true

    return res.render("index",{Tasks})
}
/* 
    tanto el getTask1 y el putTask en la url
    localhost:3000/task/
    requiren la _id:object()
    de la base de datos de mongo entonces
    pruebe con esta url:
    localhost:3000/task/63249c7ee50fc0f462888f3b
    
*/
ctrlTask.getTask1 = async (req, res) => {
    try {
        // || TaskModel.find({id: req.params['idTask']}))
        const Task = await TaskModel.findById(req.params['idTask'] ) ;
        const vaciOLleno = Task === null
        if(!vaciOLleno || Task.length > 0){
            return res.json(
                {
                    message: "Tarea encontrada.",
                    Task
                }
            )
        }else{
            return res.status(404).json({
                message: "Tarea no encontrada"
            })
        }
    } catch (error) {
        res.send(`Error:  ${error} `)
    }
}
ctrlTask.postTask = async (req, res) => {
    const {id,nombre, motivo, fecha, estado} = req.body;

    const newTask = new TaskModel(
        {
            id,
            nombre,
            motivo,
            fecha,
            estado
        }
    );

    const Task = await newTask.save();

    return res.json(
        {
            message:"Tarea guardada correctamente.",
            Task
        }
    )

};

ctrlTask.putTask = async (req, res) => {

    const id = req.params.idTask;

    const { nombre, motivo , fecha, estado } = req.body;

    if(!id || !nombre || !motivo) {
        return res.status(400).json({
            msg:"No viene id en la petición."
        })
    }
    try {
        const tareaActualizada = await TaskModel.findByIdAndUpdate(id, {nombre, motivo,fecha,estado}/* , (err, docs)=>{
            if(err){
                console.log(err)
            }else{
                console.log("updated User : ", docs)
            }
        } */);
        return res.json({
            tareaActualizada
        })
    } catch (error) {
        // console.log(error.message);
        return res.status(500).json({
            msg: "Error al actualizar la tarea"
        })
    }
}

ctrlTask.deleteTask = async (req, res) => {
    /* try {
        const id_task = req.params['idTask'];
        TaskModel.findByIdAndDelete(id_task).exec()
        return res.json(
            {
                message: "Tarea eliminada.",
                id_task
            }
        )
    } catch (error) {
        console.log(`Error, no se pudo eliminar la tarea: ${error}`)
    } */
    const id = req.params.idTask;
    try {
     await TaskModel.findByIdAndUpdate(id, {isActive:false});

     return res.send({
        message:"Usuario eliminado correctamente"
     })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        msg: 'Internal Server Error' 
     })
    }
};

// Exportamos el controlador
module.exports = ctrlTask;