import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const notaSchema = new Schema({
    //_id: { type: String, required: [true, 'Campo identificacion Obligatorio'], trim: true },
    nota: {type: Number, required: [true, 'Campo apellido obligatorio'], trim: true},
    retroalimentacion: {type: String, required: false,trim: true},
    estudianteId: {type: String, trim: true},
    evaluacionId: {type: String, trim: true}
},
    {
        versionKey: false
    }
);

const notas = mongoose.model('notas', notaSchema);

export default notas;
