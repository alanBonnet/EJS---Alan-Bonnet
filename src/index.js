// Importaciones de librerías
const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const {helmet} = require('helmet');
require('ejs')


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
// app.use(express.urlencoded())

// Recursos estáticos

app.use(express.static(path.join(__dirname, 'public')));
// app.use(helmet())

//template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Rutas

app.use(require("./routes/users.routes"));//ruta de usuarios
app.use(require("./routes/tasks.routes"));//ruta de tareas



// Iniciar servidor
app.listen(port, console.log(`
    Servidor iniciado en: http://localhost:${port}
`))


