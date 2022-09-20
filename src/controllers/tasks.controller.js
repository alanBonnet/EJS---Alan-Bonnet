// Importamos el modelo
const TaskModel = require('../models/TASKS');

// Inicializamos el objeto CtrlTask
const ctrlTask = {};

ctrlTask.getTasks = async (req, res) => {
    const Tasks = await TaskModel.find();

    return res.json(
        {
            message: "Tareas Encontradas.",
            Tasks
        }
    )
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
        if(!vaciOLleno ){
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
    try {
        const id_task =  req.params['idTask'];
        const {nombre, motivo, fecha, estado} = req.body;
        const TaskAmodificar = 
            {
                nombre,
                motivo,
                fecha,
                estado
            };
            
        const TaskModificada = await TaskModel.findByIdAndUpdate(id_task, TaskAmodificar);
        return res.json(
            {
                message: "REQ PUT",
                id_task,
                TaskModificada
            }
        )
    } catch (error) {
        res.status(404).send(`La id Buscada puede que no exista en la DB: ${error}`)
    }
}

ctrlTask.deleteTask = async (req, res) => {
    try {
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
    }
};

// Exportamos el controlador
module.exports = ctrlTask;