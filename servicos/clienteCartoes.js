//Utiliza-se esse pacote para facilitar o consumo do lado cliente de uma api
var restify = require('restify');
//Criação do cliente em função desse serviço(cardfast)
var cliente = restify.createJsonClient({
    url:'http://localhost:3001'
});

cliente.post('/cartoes/autoriza', function(erro, req, res, retorno){
          console.log('consumindo servico de cartoes');
          console.log(retorno);
});