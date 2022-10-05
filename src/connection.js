const mongoose = require('mongoose');

const connectDB = async () =>{
    const DB = process.env.MONGODB_URI
    try {
        mongoose.connect(  DB );
        console.log(`connectado a la base de datos ${DB}`)
    } catch (error) {
        console.log(`No se pudo conectar la base de datos: ${error}`)
    }
}

module.exports = connectDB