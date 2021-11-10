import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const docenteSchema = new Schema({
    //_id: { type: String, required: [true, 'Campo id Obligatorio'], trim: true },
    nombre: { type: String, required: [true, 'Campo nombre obligatorio'], trim: true },
    apellido: { type: String, required: [true, 'Campo apellido obligatorio'], trim: true },
    celular: { type: String, required: false, trim: true },
    usuario: { type: String, required: [true, 'Campo usuario obligatorio'], trim: true},
    clave: { type: String, required: [true, 'Campo clave obligatorio'], trim: true },
    areas: [{
        type: String,
        ref: 'areas'
    }]
},
    {
        versionKey: false
    }
);

const docentes = mongoose.model('docentes', docenteSchema);

export default docentes;