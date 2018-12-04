//Pacote para realizar requisições em serviços SOAP
var soap = require('soap');

//Função construtora
function CorreiosSOAPClient(){
    //endereço da funcao no wsdl
    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}
//Toda vez que esse arquivo for chamado ele executará essa função construtora
module.exports = function(){
     return CorreiosSOAPClient;
}

CorreiosSOAPClient.prototype.calculaPrazo = function(args, callback){
    soap.createClient(this._url, function(erro, cliente){

            console.log("Cliente soap criado");
            //Apesar do SOAP trabalhar com XML, o pacote soap aceita JSON
            cliente.CalcPrazo(args, callback);
        });
       

}

