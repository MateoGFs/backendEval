import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const alternativaSchema = new Schema({
    respuesta: { type: String, required: [true, 'Campo respuesta obligatorio'], trim: true },
    valor: { type: Boolean, required: [true, 'Campo valor obligatorio'], trim: true, default: false },
    preguntaId: {type: String, trim: true}
},
    {
        versionKey: false
    }
);

const alternativas = mongoose.model('alternativas', alternativaSchema);

export default alternativas;