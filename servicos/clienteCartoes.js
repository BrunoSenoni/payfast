//Utiliza-se esse pacote para facilitar o consumo do lado cliente de uma api
var restify = require('restify');
var clients = require('restify-clients');
    function CartoesClient(){
        //Criação do cliente em função desse serviço(cardfast)
        this._cliente = clients.createJsonClient({
            //Consumir o Cardfast 
            url:'http://localhost:3001'
        });
}
CartoesClient.prototype.autoriza = function(cartao, callback){
 //Invocacao de métodos no Cardfast 
    this._cliente.post('/cartoes/autoriza', cartao, callback);
}

module.exports = function(){
    return CartoesClient;
}