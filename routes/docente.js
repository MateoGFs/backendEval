import express from 'express';
import { model } from 'mongoose';

const router = express.Router();


import docentes from '../models/docente';


//Agregar un docente
router.post('/nuevo-docente', async (req, res) => {
    const body = req.body;
    try {
        const docenteDB = await docentes.create(body);
       // const user = docenteDB.findOne({body.usuari: usuario})
        res.status(200).json(docenteDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Obtener un docente
router.get('/docente/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const docenteBD = await docentes.findOne({ _id }).populate('areas',{nombre:1, _id:0});
        res.json(docenteBD);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Obtener todos los docentes
router.get('/docente', async (req, res) => {
    try {
        //const areaDB = await Area.find({}).populate({path: 'subareas', model: SubArea});
        const docenteDB = await docentes.find({}).populate('areas',{nombre:1, _id:0});
        res.json(docenteDB);
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

// Eliminar un docente 
router.delete('/docente/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const docenteDB = await docentes.findOneAndDelete({ _id });
        if (!docenteDB) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado', error
            })
        }
        res.json(docenteDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

// actualizar un docente
router.put('/docente/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const docenteDB = await docentes.findByIdAndUpdate(_id, body, { new: true });
        res.json(docenteDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

module.exports = router;