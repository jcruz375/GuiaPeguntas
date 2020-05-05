const sequelize = require('sequelize');
const connection = require('./database');

const resposta = connection.define('Respostas', {
    corpo: {
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
    
});

resposta.sync({force:false});

module.exports = resposta;