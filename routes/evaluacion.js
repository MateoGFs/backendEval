import express from 'express';
import { model } from 'mongoose';

const router = express.Router();

import areas from '../models/area'
import evaluaciones from '../models/evaluacion';
import grupos from '../models/grupo'
import preguntas from '../models/pregunta';

//Agregar una evaluacion 
router.post('/nueva-evaluacion', async (req, res) => {
    const {
        nombre,
        descripcion,
        fecha, 
        areaId,
        grupoId,
        realizada
    } = req.body;

    const area = await areas.findById(areaId);
    const grupo = await grupos.findById(grupoId);

    const newEvaluacion = new evaluaciones({
        nombre,
        descripcion,
        fecha,
        areaId: area._id,
        grupoId: grupo._id,
        realizada
    });

    try {
        const evaluacionDB = await newEvaluacion.save();
        area.evaluaciones = area.evaluaciones.concat(evaluacionDB._id);
        grupo.evaluaciones = grupo.evaluaciones.concat(evaluacionDB._id);
        await area.save();
        await grupo.save();
        res.status(200).json(evaluacionDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Obtener todas las evaluaciones
router.get('/evaluacion', async (req, res) => {
    try {
        const evaluacionDB = await evaluaciones.find().populate('preguntas',{enunciado:1,descripcion:1,_id:0, 'alternativas':1} );
        //const evaluacionDB = await evaluaciones.find();
        res.json(evaluacionDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

//Obtener un evaluacion
router.get('/evaluacion/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const evaluacionDB = await evaluaciones.findOne({ _id }).populate('preguntas',{enunciado:1,descripcion:1,_id:0, 'alternativas':1} );
        res.json(evaluacionDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//filtrar por grupo y area
router.get('/filtroE/:criterio/:criterio2', async(req, res) => {
    const grupoId = req.params.criterio;
    const areaId = req.params.criterio2;

    try {

        const evaluacionDB = await evaluaciones.find({ grupoId: grupoId ,areaId: areaId});
        res.json(evaluacionDB)


    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrio error',
            error
        })
    }

});

//filtrar por grupo 
router.get('/filtroG/:criterio', async(req, res) => {
    const grupoId = req.params.criterio;

    try {

        const evaluacionDB = await evaluaciones.find({ grupoId: grupoId });
        res.json(evaluacionDB)


    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrio error',
            error
        })
    }

});

//filtrar por area
router.get('/filtroA/:criterio', async(req, res) => {
    const areaId = req.params.criterio;

    try {

        const evaluacionDB = await evaluaciones.find({areaId: areaId});
        res.json(evaluacionDB)


    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrio error',
            error
        })
    }

});

// Eliminar una evaluacion 
router.delete('/evaluacion/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const evaluacionDB = await evaluaciones.findOneAndDelete({ _id });
        if (!evaluacionDB) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado', error
            })
        }
        res.json(evaluacionDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

// actualizar una evaluacion
router.put('/evaluacion/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const evaluacionDB = await evaluaciones.findByIdAndUpdate(_id, body, { new: true });
        res.json(evaluacionDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});
module.exports = router;
