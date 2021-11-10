/*import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    //_id: { type: String, required: [true, 'Campo identificacion Obligatorio'], trim: true },
    nombre: { type: String, required: [true, 'Campo nombre obligatorio'], trim: true },
    apellido: { type: String, required: [true, 'Campo apellido obligatorio'], trim: true },
    celular: { type: String, required: false, trim: true },
    usuario: { type: String, required: [true, 'Campo usuario obligatorio'], trim: true },
    clave: { type: String, required: [true, 'Campo clave obligatorio'], trim: true },
    grupoId: { type: String, trim: true },
    notas: [{
        type: String,
        ref: 'notas'
    }]
},
    {
        versionKey: false
    }
);

const estudiantes = mongoose.model('estudiantes', estudianteSchema);

export default estudiantes;
*/

import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const estudianteSchema = new Schema({
    //_id: { type: String, required: [true, 'Campo identificacion Obligatorio'], trim: true },
    identificacion: {type: String, required: [true, 'Campo identificacion obligatorio'], trim:true, unique:true},
    nombre: { type: String, required: [true, 'Campo nombre obligatorio'], trim: true },
    apellido: {type: String, required: [true, 'Campo apellido obligatorio'], trim: true},
    celular: {type: String, required: false,trim: true},
    clave: { type: String, required: [true, 'Campo clave obligatorio'], trim: true },
    // correo: {type: String, required: false, trim: true},
    grupoId: {type: String, trim: true},
    notas: [{
        type: String,
        ref: 'notas'
    }]
},
    {
        versionKey: false
    }
);

const estudiantes = mongoose.model('estudiantes', estudianteSchema);

export default estudiantes;
