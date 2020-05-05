//Módulos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const pergunta = require('./database/Pergunta');
const resposta = require('./database/Resposta');

//database
connection
    .authenticate()
    .then(()=>{
        console.log('Conexão com banco de dados feita com sucesso!');
    })
    .catch((msgError)=>{
        console.log(msgError);
    })

//Ejs
app.set('view engine', 'ejs'); //renderizador de html
app.use(express.static('public')); //utilizar arquivos estaticos

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

//Rotas
app.get('/', function(req, res){
    pergunta.findAll({ raw: true, order: [
        ['id', 'desc'] // desc = decrescente || asc = crescente
    ]}).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        });
    });
});

app.get('/perguntas', (req, res) =>{
    res.render('perguntar')
});

app.post('/savequestion', (req, res) =>{
    var titulo = req.body.titulo;
    var describe = req.body.describe;

    pergunta.create({
        titulo: titulo,
        description: describe
    }).then(()=>{
        res.redirect('/');
    })
});
app.get('/pergunta/:id', (req, res) =>{
    var id = req.params.id
    pergunta.findOne({
        where: {id: id}
    }).then(pergunta=>{
        if(pergunta != undefined){

            resposta.findAll({
                where: {perguntaId: pergunta.id,},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('perguntaPg', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }
        else{res.redirect('/')};
    });
});
app.post('/responder',(req, res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(res.redirect('/pergunta/'+perguntaId));
});

//Servidor
app.listen(3030, (error)=>{
    if(error){
        console.log('Falha ao iniciar o servidor, ocorreu algum erro!');
    }else{
        console.log('Servidor iniciado com sucesso!');
    }
});