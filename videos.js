const bodyParser = require("body-parser");
var express = require('express');
var router = express.Router(); 
const videoSchema = require('./src/model/video');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(function (req, res, next){
    console.log('Enrutamiento Exitoso');
    next();
});

/// consultar http://localhost:3000/api/videos en postman

router.get("/videos", (req,res) => {
    videoSchema
        .find((err,videos) => {
            if(err) res.status(500).send('Error en la BD');
            else res.status(200).json(videos);
            console.log("consultando /videos");
        });
});

/// consultar http://localhost:3000/api/videos/autor + mas parametro autor: {autor}
router.get("/videos/autor", function (req, res) {
    videoSchema.find({ autor: { $eq: req.query.autor } }, function (err, videos) {
      if (err) {
        console.log("error");
        res.status(500).send("error en el servidor: autor");
      } else res.status(200).json(videos);
    });
  });  

  router.get("/videos/fechadesde", function (req, res) {
    let min = req.query.fecha1;
    let max = req.query.fecha2;
    videoSchema.find({ fecha: { $gte: min, $lte: max} }, function (err, videos) {
        console.log(min,max);
      if (err) {
        console.log("error");
        res.status(500).send("error de servidor: fechadesde");
      } else res.status(200).json(videos);
    });
  }); 

/// consultar http://localhost:3000/api/videos/:id en postman automaticamente le crea el parametro id para llenar

router.get("/videos/:id", function (req, res) {
    videoSchema.findById(req.params.id, function (err, videos) {
      if (err) res.status(500).send("error en el servidor: id");
      else {
        if (videos != null) {
            console.log("consultando /videos/:id");
          res.status(200).json(videos);
        } else res.status(404).send("No se encontro el video");
      }
    });
  });

/// consultar http://localhost:3000/api/videos usando x-wwww-form-urlencoded para los parametros

router.post("/videos", (req, res) => {
    const video = new videoSchema({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      duracion: req.body.duracion,
      autor: req.body.autor,
      enlace: req.body.enlace,
      fecha: req.body.fecha
    });
  
    video.save(function (error, videos) {
      if (error) {
        res.status(500).send("No se ha podido agregar.");
      } else {
        res.status(200).send("Agregado correctamente"); 
      }
    });
  });

  /// consultar http://localhost:3000/api/videos/:id en postman automaticamente le crea el parametro id para llenar
  router.delete("/videos/:id", function (req, res) {
    videoSchema.findById(req.params.id, function (err, videos) {
      if (err) res.status(500).send("Error en la base de datos");
      else {
        if (videos != null) {
          videos.remove(function (error, result) {
            if (error) res.status(500).send("Error en la base de datos");
            else {
              res.status(200).send("Eliminado exitosamente");
            }
          });
        } else res.status(404).send("No se encontro ese video");
      }
    });
    });

module.exports = router;