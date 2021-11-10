import express from 'express';
import { model } from 'mongoose';

const router = express.Router();

import areas from '../models/area'
import docentes from '../models/docente';

//Agregar un area
router.post('/nueva-area', async (req, res) => {
    const body = req.body;
    try {
        const areaDB = await areas.create(body);
        res.status(200).json(areaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
    // // const {
    // //     nombre,
    // //     docenteId
    // // } = req.body;

    // const docente = await docentes.findById(docenteId);

    // const newArea = new areas({
    //     // nombre,
    //     // docenteId: docente._id
    // });

    // try {
    //     const areaDB = await newArea.save();
    //     docente.areas = docente.areas.concat(areaDB._id);
    //     await docente.save();
    //     res.status(200).json(areaDB);
    // } catch (error) {
    //     return res.status(500).json({
    //         mensaje: 'Ocurrio un error',
    //         error
    //     })
    // }
});

//Obtener todas las areas
router.get('/area', async (req, res) => {
    try {
        const areaDB = await areas.find();
        res.json(areaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

//Obtener un area
router.get('/area/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const areaDB = await areas.findOne({ _id });
        res.json(areaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Eliminar una area 
router.delete('/area/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const areaDB = await areas.findOneAndDelete({ _id });
        if (!areaDB) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado', error
            })
        }
        res.json(areaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

// actualizar una area
router.put('/area/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const areaDB = await areas.findByIdAndUpdate(_id, body, { new: true });
        res.json(areaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});
module.exports = router;
