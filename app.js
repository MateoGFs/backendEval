import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

//Conexion a base de datos
const mongoose = require('mongoose');
//const uri = 'mongodb://localhost:27017/examenes1'; 
const uri = 'mongodb+srv://mateo:mateo@cluster0.yciz1.mongodb.net/examenes1?retryWrites=true&w=majority';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(uri,options).then(
    () => {
        console.log('Conectado a la base de datos examenes1');
    },
    err => {
        console.log(err);
    }
);

// Middleware 
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public'))); 

// Rutas 
app.use('/api', require('./routes/area'));
app.use('/api', require('./routes/docente'));
app.use('/api', require('./routes/grupo'));
app.use('/api', require('./routes/estudiante'));
app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/evaluacion'));
app.use('/api', require('./routes/pregunta'));
app.use('/api', require('./routes/alternativa'));


// Middleware para Vue.js router modo history 
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 5000);
app.listen(app.get('puerto'), () => {
    console.log('Servidor escuchando en el puerto ' + app.get('puerto'));
});

