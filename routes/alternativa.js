import express from 'express';
import { model } from 'mongoose';

const router = express.Router();

import alternativas from '../models/alternativa'
import preguntas from '../models/pregunta';

//Agregar una alternativa 
router.post('/nueva-alternativa', async (req, res) => {
    const {
        respuesta,
        valor,
        preguntaId
    } = req.body;

    const pregunta = await preguntas.findById(preguntaId);

    const newAlternativa = new alternativas({
        respuesta,
        valor,
        preguntaId: pregunta._id
    });

    try {
        const alternativaDB = await newAlternativa.save();
        pregunta.alternativas = pregunta.alternativas.concat(alternativaDB._id);
        await pregunta.save();
        res.status(200).json(alternativaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Obtener todas las alternativas
router.get('/alternativa', async (req, res) => {
    try {
        const alternativaDB = await alternativas.find();
        res.json(alternativaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

//Obtener un alternativa
router.get('/alternativa/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const alternativaDB = await alternativas.findOne({ _id });
        res.json(alternativaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Filtro por pregunta
router.get('/filtroU/:criteriou', async(req, res) => {
    const preguntaId = req.params.criteriou;

    try {

        const alternativaDB = await alternativas.find({ preguntaId: preguntaId });
        res.json(alternativaDB)


    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrio error',
            error
        })
    }

});

// Eliminar una alternativa 
router.delete('/alternativa/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const alternativaDB = await alternativas.findOneAndDelete({ _id });
        if (!alternativaDB) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado', error
            })
        }
        res.json(alternativaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

// actualizar una alternativa
router.put('/alternativa/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const alternativaDB = await alternativas.findByIdAndUpdate(_id, body, { new: true });
        res.json(alternativaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});
module.exports = router;
