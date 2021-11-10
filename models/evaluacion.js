import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const evaluacionSchema = new Schema({
    nombre: {type: String, required: [true, 'Campo nombre obligatorio'], trim: true},
    descripcion: {type: String, required: false, trim: true},
    fecha: { type: Date, required: [true, 'Campo fecha obligatorio'], default: Date.now },
    areaId: {type: String, trim: true},
    grupoId: {type: String, trim: true},
    realizada: {type: Boolean, trim: true, default: false},
    preguntas: [{
        type: String,
        ref: 'preguntas'
    }],
},
    {
        versionKey: false
    }
);

const evaluaciones = mongoose.model('evaluaciones', evaluacionSchema);

export default evaluaciones;