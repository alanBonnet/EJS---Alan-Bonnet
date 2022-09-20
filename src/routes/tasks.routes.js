const { getTasks, getTask1, postTask, putTask, deleteTask } = require('../controllers/tasks.controller');


const router = require('express').Router();



router.get('/task', getTasks);

router.get('/task/:idTask' , getTask1)

router.post('/task', postTask);

router.put('/task/:idTask', putTask);

router.delete('/task/:idTask', deleteTask)


module.exports = router;