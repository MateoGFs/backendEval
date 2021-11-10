import express from 'express';
import { model } from 'mongoose';

const router = express.Router();

import evaluaciones from '../models/evaluacion'
import estudiantes from '../models/estudiante'
import notas from '../models/nota'

//Agregar una nota 
router.post('/nueva-nota', async (req, res) => {
    const {
        nota,
        retroalimentacion,
        evaluacionId,
        estudianteId
    } = req.body;

    const evaluacion = await evaluaciones.findById(evaluacionId);
    const estudiante = await estudiantes.findById(estudianteId);

    const newNota = new notas({
        nota,
        retroalimentacion,
        evaluacionId: evaluacion._id,
        estudianteId: estudiante._id,
    });

    try {
        const notaDB = await newNota.save();
        estudiante.evaluaciones = estudiante.estudiantes;
        evaluacion.evaluaciones = evaluacion.evaluaciones;;
        await evaluacion.save();
        await estudiante.save();
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Obtener todas las notas
router.get('/notas', async (req, res) => {
    try {
        const notaDB = await notas.find();
        res.json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

//Obtener un nota
router.get('/nota/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const evaluacionDB = await notas.findOne({ _id });
        res.json(evaluacionDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Eliminar una nota 
router.delete('/nota/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const evaluacionDB = await notas.findOneAndDelete({ _id });
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
//Filtro por evaluacion
router.get('/filtroN/:criterion', async(req, res) => {
    const evaluacionId = req.params.criterion;

    try {

        const notaDB = await notas.find({ evaluacionId: evaluacionId });
        res.json(notaDB)


    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrio error',
            error
        })
    }

});

// actualizar una notas
router.put('/nota/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const evaluacionDB = await notas.findByIdAndUpdate(_id, body, { new: true });
        res.json(evaluacionDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});
module.exports = router;
