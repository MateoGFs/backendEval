import express from 'express';
import { model } from 'mongoose';

const router = express.Router();

import preguntas from '../models/pregunta'
import evaluaciones from '../models/evaluacion';

//Agregar una pregunta 
router.post('/nueva-pregunta', async (req, res) => {
    const {
        enunciado,
        descripcion,
        evaluacionId
    } = req.body;

    const evaluacion = await evaluaciones.findById(evaluacionId);

    const newPregunta = new preguntas({
        enunciado,
        descripcion,
        evaluacionId: evaluacion._id
    });

    try {
        const preguntaDB = await newPregunta.save();
        evaluacion.preguntas = evaluacion.preguntas.concat(preguntaDB._id);
        await evaluacion.save();
        res.status(200).json(preguntaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Obtener todas las preguntas
router.get('/pregunta', async (req, res) => {
    try {
        const preguntaDB = await preguntas.find().populate('alternativas',{respuesta:1,valor:1,_id:1, 'alternativas':1} );;
        res.json(preguntaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

//filtrar por Evaluacion
router.get('/filtroP/:criteriop', async(req, res) => {
    const evaluacionId = req.params.criteriop;

    try {

        const preguntaDB = await preguntas.find({ evaluacionId: evaluacionId });
        res.json(preguntaDB)


    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrio error',
            error
        })
    }

});

//Obtener un pregunta
router.get('/pregunta/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const preguntaDB = await preguntas.findOne({ _id });
        res.json(preguntaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Eliminar una pregunta 
router.delete('/pregunta/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const preguntaDB = await preguntas.findOneAndDelete({ _id });
        if (!preguntaDB) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado', error
            })
        }
        res.json(preguntaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

// actualizar una pregunta
router.put('/pregunta/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const preguntaDB = await preguntas.findByIdAndUpdate(_id, body, { new: true });
        res.json(preguntaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});
module.exports = router;
