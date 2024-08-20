//Archivo de configuracion de Sequelize para conectar con la DB

const { Sequelize } = require('sequelize');   //Importa Sequelize desde la biblioteca
require('dotenv').config();   //Importa las variables de entorno desde el .env

//Creacion de una instancia de Sequelize con las variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME,   
    process.env.DB_USER,   
    "",   //La password de la DB es vacia
    {
        host: process.env.DB_HOST,   
        dialect: 'mysql',   
        port: 3306,   
});

module.exports = sequelize;   //Exporta la instancia de Sequelize creada para que otros modulos la puedan usar
