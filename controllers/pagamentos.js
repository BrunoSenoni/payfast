//Atende uma requisição na url /pagamentos a partir de uma chamada com o método GET(HTTP)
module.exports = function(app){
    app.get("/pagamentos", function(req, res){
        
           res.send("ok");
    });  
 //Function é uma função de Callback   
 //Essa função recebe dados para realizar um pagamento 
    app.post('/pagamentos/pagamento', function(req, res){
        //.assert é um validator do express. Serve para validação, filtragem e tratamento de dados 
        //O campo forma_de_pagamento não pode ser vazio
        req.assert("forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        //O campo valor não pode ser vazio e deve ser decimal
        req.assert("valor", "Valor é obrigatório e deve ser decimal").notEmpty().isFloat();

        var erros = req.validationErros();

        if(erros){
            console.log("erros de validacao encontrados");
            res.status(400).send(erros);
        }

    //corpo da requisição
        var pagamento = req.body;
        console.log('processando uma requisição de um novo pagamento');

        pagamento.status = "Criado";
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(erro, resultado){
            if(erro){
                console.log("Erro ao inserir no banco" + erro);
                res.status(400).send(erro);
            }else{
           console.log('pagamento criado');
           res.json(pagamento);
        }
        });

        
    });
}