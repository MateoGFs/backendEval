import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const preguntaSchema = new Schema({
    //_id: { type: String, required: [true, 'Campo identificacion Obligatorio'], trim: true },
    enunciado: {type: String, required: [true, 'Campo enuciado obligatorio'], trim: true},
    descripcion: {type: String, required: false,trim: true},
    evaluacionId: {type: String, trim: true},
    alternativas: [{
        type: String,
        ref: 'alternativas'
    }],
},
    {
        versionKey: false
    }
);

const preguntas = mongoose.model('preguntas', preguntaSchema);

export default preguntas;