/*import express from 'express';
import { model } from 'mongoose';

const router = express.Router();

import estudiantes from '../models/estudiante'
import grupos from '../models/grupo';

//Agregar un estudiante
router.post('/nuevo-estudiante', async (req, res) => {
    const {
        nombre,
        apellido,
        celular, 
        correo ,
        usuario,
        clave,
        grupoId 
    } = req.body;

    const grupo = await grupos.findById(grupoId);

    const newEstudiante = new estudiantes({
        nombre,
        apellido,
        celular,
        correo,
        usuario,
        clave,
        grupoId: grupo._id
    });

    try {
        const estudianteDB = await newEstudiante.save();
        grupo.estudiantes = grupo.estudiantes.concat(estudianteDB._id);
        await grupo.save();
        res.status(200).json(estudianteDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Obtener todas las estudiantes
router.get('/estudiante', async (req, res) => {
    try {
        const estudianteDB = await estudiantes.find();
        res.json(estudianteDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

//Obtener un estudiante
router.get('/estudiante/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const estudianteDB = await estudiantes.findOne({ _id });
        res.json(estudianteDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Eliminar una estudiante 
router.delete('/estudiante/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const estudianteDB = await estudiantes.findOneAndDelete({ _id });
        if (!estudianteDB) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado', error
            })
        }
        res.json(estudianteDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

// actualizar una estudiante
router.put('/estudiante/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const estudianteDB = await estudiantes.findByIdAndUpdate(_id, body, { new: true });
        res.json(estudianteDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});
module.exports = router;
*/


import express from 'express';
import { model } from 'mongoose';

const router = express.Router(); 

import estudiantes from '../models/estudiante'
import grupos from '../models/grupo';

//Agregar un estudiante
router.post('/nuevo-estudiante', async (req, res) => {
    const {
        identificacion,
        nombre,
        apellido,
        celular, 
        clave,
        grupoId 
    } = req.body;

    const grupo = await grupos.findById(grupoId);

    const newEstudiante = new estudiantes({
        identificacion,
        nombre,
        apellido,
        celular,
        clave,
        grupoId: grupo._id
    });

    try {
        const estudianteDB = await newEstudiante.save();
        grupo.estudiantes = grupo.estudiantes.concat(estudianteDB._id);
        await grupo.save();
        res.status(200).json(estudianteDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Obtener todos los estudiantes
router.get('/estudiante', async (req, res) => {
    try {
        const estudianteDB = await estudiantes.find();
        res.json(estudianteDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

//filtrar por grupo
router.get('/filtro/:criterio', async(req, res) => {
    const grupoId = req.params.criterio;

    try {

        const estudianteDB = await estudiantes.find({ grupoId: grupoId });
        res.json(estudianteDB)


    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrio error',
            error
        })
    }

});

//Obtener un estudiante
router.get('/estudiante/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const estudianteDB = await estudiantes.findOne({ _id });
        res.json(estudianteDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Eliminar una estudiante 
router.delete('/estudiante/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const estudianteDB = await estudiantes.findOneAndDelete({ _id });
        if (!estudianteDB) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado', error
            })
        }
        res.json(estudianteDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});

// actualizar una estudiante
router.put('/estudiante/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const estudianteDB = await estudiantes.findByIdAndUpdate(_id, body, { new: true });
        res.json(estudianteDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', error
        })
    }
});
module.exports = router;
