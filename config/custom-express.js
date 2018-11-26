//Carregamento do módulo Express
var express = require('express');
//Carregament do módulo consign, que serve para centralizar todos os carregamentos de módulos em um só lugar
var consign = require('consign');

module.exports = function() {
    //Armazena de fato o objeto do express
    var app = express();
    //Tudo o que for carregado pelo consign deve ser incluido ao objeto do express que está sendo referenciado pela variável app
    consign()
    //Agora o consign informa ao express que deve fazer um scan de todos os arquivos dentro da pasta controllers carregá-los para dentro do seu objeto
    .include('controllers')
    .into(app);
    
    return app;
}