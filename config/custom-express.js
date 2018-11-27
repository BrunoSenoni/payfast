//Carregamento do módulo Express
var express = require('express');
//Carregament do módulo consign, que serve para centralizar todos os carregamentos de módulos em um só lugar
var consign = require('consign');
//o bodyparser converte o body da requisição para vários formatos
var bodyParser = require('body-parser');
//Validação de dados
var expressValidator = require('express-validator');

module.exports = function() {
    //Armazena de fato o objeto do express
    var app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    //o app agora é capaz de realizar o parse do corpo de uma requisição
    app.use(bodyParser.json());
    //o app agora é capaz de realizar validações 
    app.use(expressValidator());
    //Tudo o que for carregado pelo consign deve ser incluido ao objeto do express que está sendo referenciado pela variável app
    consign()
    //Agora o consign informa ao express que deve fazer um scan de todos os arquivos dentro da pasta controllers e persistencia, carregá-los para dentro do seu objeto
    .include('controllers')
    .then('persistencia')
    .into(app);
    
    return app;
}