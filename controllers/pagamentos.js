//Atende uma requisição na url /pagamentos a partir de uma chamada com o método GET(HTTP)
module.exports = function(app){
    app.get("/pagamentos", function(req, res){
        
           res.send("ok");
    }); 
    /*
        Estilo arquitetural REST: verbo +    recurso = operacao REST
                                  headers
                                  body
                                  parametros 
                                  hypermidia
                                  hyperlinks
    */
    app.delete('pagamentos/pagamento/:id', function(req,res){
         var pagamento = {};
         var id = req.params.id;

         pagamento.id = id;
         pagamento.status = 'cancelado';

         var connection = app.persistencia.connectionFactory();
         var pagamentoDao = new app.persistencia.pagamentoDao(connection);

         pagamentoDao.atualiza(pagamento, function(erro){
             if(erro){
                 res.status(500).send(erro);
                 return;
             }
             console.log("pagamento cancelado");
             res.status(204).send(pagamento);
         });
    });
//Confirmar pagamento 
    app.put('pagamentos/pagamento/:id', function(req,res){
        var pagamento = {}; 
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'confirmado';
        
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function(){
               if(erro){
                   res.status(500).send(erro);
                   return;
               }
               console.log("pagamento criado");
               res.send(pagamento);
        });

    });
 //Function é uma função de Callback   
 //Essa função recebe dados para realizar um pagamento 
    app.post('/pagamentos/pagamento', function(req, res){
        //.assert é um validator do express. Serve para validação, filtragem e tratamento de dados 
        //O campo forma_de_pagamento não pode ser vazio
        req.assert("forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        //O campo valor não pode ser vazio e deve ser decimal
        req.assert("valor", "Valor é obrigatório e deve ser decimal").notEmpty().isFloat();

        var erros = req.validationErrors();

        if(erros){
            console.log("erros de validacao encontrados");
            res.status(400).send(erros);
            return;
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
                res.status(500).send(erro);
            }else{
           console.log('pagamento criado');
           //InsertID é uma função do módulo do MYSQL, ou seja, quando for criado um novo pagamento será criada uma url com o id desse pagamento
           res.location('/pagamentos/pagamento/' + resultado.insertId);
           //201 é status code de created, ou seja, mostrar na response o código correto no caso
           res.status(201).json(pagamento);
        }
        });

        
    });
}