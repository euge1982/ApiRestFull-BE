//Archivo principal de la aplicacion donde se configura e inicia el servidor

const express = require('express');   //Importa express
const sequelize = require('./Config/database');   //Importa la configuracion de Sequelize
const userRoutes = require('./Routes/userRoutes');   //Importa las rutas
require('dotenv').config();   //Carga las variables de entorno desde el archivo .env

const app = express();   //Crea una instancia de Express
const PORT = process.env.PORT || 3000;   //Define el puerto en el que el servidor escuchara las solicitudes, desde el archivo .env

//Middleware para parsear JSON
app.use(express.json());

//Rutas de usuarios
app.use('/api/users', userRoutes);

//Conectar a la base de datos y arrancar el servidor
sequelize.sync()   //Sincroniza el modelo con la base de datos
  .then(() => {
    console.log('Database sincronizada exitosamente');

    //Inicia el servidor Express para escuchar las solicitudes en el puerto especificado (3000)
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => console.log('Error al conectar con la base de datos:', error));   //Si no se puede conectar a la base de datos, manda el msj de error

//Definir la ruta para "/"
app.get('/', (req, res) => {
    res.send('<h1>API RESTFULL BACKEND</h1>')
  });