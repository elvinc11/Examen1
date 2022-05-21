const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
    {
    
        titulo: String,
        descripcion: String,
        duracion: String,
        autor: String,
        enlace: String,
        fecha: String
    },
    {
        collection : "videos",versionKey: false 
    }

);

module.exports = mongoose.model('video', videoSchema);