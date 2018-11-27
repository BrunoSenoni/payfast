//Atende uma requisição na url /pagamentos a partir de uma chamada com o método GET(HTTP)
module.exports = function(app){
    app.get("/pagamentos", function(req, res){
        
           res.send("ok");
    });  
 //Function é uma função de Callback   
 //Essa função recebe dados para realizar um pagamento 
    app.post('/pagamentos/pagamento', function(req, res){
    //corpo da requisição
        var pagamento = req.body;
        console.log('processando uma requisição de um novo pagamento');

        pagamento.status = "Criado";
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(erro, resultado){
           console.log('pagamento criado');
           res.json(pagamento);
        });

        
    });
}