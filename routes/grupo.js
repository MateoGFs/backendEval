import express from 'express';
import { model } from 'mongoose';

const router = express.Router();

import grupos from '../models/grupo'

//Agregar un grupo
router.post('/nuevo-grupo', async (req, res) => {
    const body = req.body;
    try {
        const grupoDB = await grupos.create(body);
        res.status(200).json(grupoDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Obtener un grupo
router.get('/grupo/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const grupoDB = await grupos.findOne({ _id });
        res.json(grupoDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Obtener todos los grupos
router.get('/grupo', async (req, res) => {
    try {
        const grupoDB = await grupos.find().populate('evaluaciones',{nombre:1, _id:1});
        res.json(grupoDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

// Eliminar un grupo 
router.delete('/grupo/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const grupoDB = await grupos.findOneAndDelete({ _id });
        if (!grupoDB) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado', error
            })
        }
        res.json(grupoDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

// actualizar un grupo
router.put('/grupo/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const grupoDB = await grupos.findByIdAndUpdate(_id, body, { new: true });
        res.json(grupoDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});
module.exports = router;