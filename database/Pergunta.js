const sequelize = require('sequelize');
const connection = require('./database');

const perguntas = connection.define('Perguntas', {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

perguntas.sync({force: false}).then(() => {console.log('Tabela criada!!')})

module.exports = perguntas;