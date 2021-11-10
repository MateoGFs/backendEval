import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const grupoSchema = new Schema({
    nombre: { type: String, required: [true, 'Campo nombre obligatorio'], trim: true },
    evaluaciones: [{
        type: String,
        ref: 'evaluaciones'
    }],
    estudiantes: [{
        type: String,
        ref: 'estudiantes'
    }]
},
    {
        versionKey: false
    }
);

const grupos = mongoose.model('grupos', grupoSchema);

export default grupos;