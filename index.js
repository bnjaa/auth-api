const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const db = require('./database/database');
require('dotenv').config();


// Crear el servidor
const app = express();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use( express.json() );

// Log requests to the console.
app.use(logger('dev'));


// Rutas
app.use('/api/auth', require('./routes/auth'));



// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Corriendo en el puerto ${process.env.PORT}`);
        ( async () => {

            try {
                
                await db.authenticate();
                await db.sync();
                console.log('Base de datos ONLINE');
            } catch (error) {
                console.error('Error al conectar a la base de datos:', error);
            }

        })();
} )