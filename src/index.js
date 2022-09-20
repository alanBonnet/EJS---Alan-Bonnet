// Importaciones de librerías
const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config();

// Conexión a la base de datos
const connectDB = require('./connection');

connectDB()

// Se inicializa la librería 

const app = express();



// Configuraciones
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());

app.use(morgan("combined"));

app.use(express.json());

// Recursos estáticos

app.use(express.static(path.join(__dirname,'public')));

// Rutas

app.use(require("./routes/users.routes"));//ruta de usuarios
app.use(require("./routes/tasks.routes"));//ruta de tareas



// Iniciar servidor
app.listen(port, console.log(`
    Servidor iniciado en: http://localhost:${port}
`))


