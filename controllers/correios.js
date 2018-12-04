module.exports = function(app){
    app.post('/correios/calculo-prazo', function(req, res){
       var dadosDaEntrega = req.body;
       //Quando for executado app.serrvicos.correiosSOAPClient(), será executado a função setada no module.exports de correiosSOAPClient
       var correiosSOAPClient = new app.servicos.correiosSOAPClient();
       correiosSOAPClient.calculaPrazo(dadosDaEntrega, 
               function(erro, resultado){
                   if(erro){
                       res.status(500).send(erro);
                       return;
                   }
                   console.log("'prazo calculado");
                   res.json(resultado);

       });

    });
}