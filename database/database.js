const sequelize = require('sequelize');

const connection = new sequelize('guiaPerguntas', 'root', 'rT6$ukS%', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;