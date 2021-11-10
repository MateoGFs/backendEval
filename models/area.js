/*import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const areaSchema = new Schema({
    //_id: { type: String, required: [true, 'Campo id Obligatorio'], trim: true },
    nombre: { type: String, required: [true, 'Campo nombre obligatorio'], trim: true },
    docenteId: {type: String, trim: true},
    evaluaciones: [{
        type: String,
        ref: 'evaluaciones'
    }]
},
    {
        versionKey: false
    }
);

const areas = mongoose.model('areas', areaSchema);

export default areas;
*/
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const areaSchema = new Schema({
    //_id: { type: String, required: [true, 'Campo id Obligatorio'], trim: true },
    nombre: { type: String, required: [true, 'Campo nombre obligatorio'], trim: true },
    
    evaluaciones: [{
        type: String,
        ref: 'evaluaciones'
    }]
},
    {
        versionKey: false
    }
);

const areas = mongoose.model('areas', areaSchema);

export default areas;