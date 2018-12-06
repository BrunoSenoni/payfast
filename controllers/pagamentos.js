//incluio o arquivo de logger
var logger = require('../servicos/logger.js');

//Atende uma requisição na url /pagamentos a partir de uma chamada com o método GET(HTTP)
module.exports = function(app){
    app.get("/pagamentos", function(req, res){
        
           res.send("ok");
           console.log(res);
    }); 
    /*
        Estilo arquitetural REST: verbo +    recurso = operacao REST
                                  headers
                                  body
                                  parametros 
                                  hypermidia
                                  hyperlinks
    */
   //Altera status do pagamento para cancelado
   //Consulta um pagamento pelo id
    app.get('/pagamentos/pagamento/:id', function(req,res){
        var id = req.params.id;
        console.log("Consultado pagamento" + id);
        //Esse logger irá gerar esse log na pasta logs(conforme configurado na pasta logger.js)
        logger.info("consultando pagamento " + id);
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);
        pagamentoDao.buscaPorId(id, function(erro, resultado){
              if(erro){
                  console.log("erro ao consultar no banco" + erro);
                  res.status(500).send(erro);
                  return;
              }
              console.log("pagamentos encontrados: " + JSON.stringify(resultado));
              res.json(resultado);
              return;
        });
    });

    app.delete('/pagamentos/pagamento/:id', function(req,res){
         var pagamento = {};
         var id = req.params.id;
         
         pagamento.id = id;
         pagamento.status = 'Cancelado';

         var connection = app.persistencia.connectionFactory();
         var pagamentoDao = new app.persistencia.PagamentoDao(connection);

         pagamentoDao.atualiza(pagamento, function(erro){
             if(erro){
                 res.status(500).send(erro);
                 return;
             }
             console.log("pagamento cancelado");
             //.status é o status code do HTTP
             res.status(204).send(pagamento);
         });
    });
//Altera status do pagamento para confirmado
    app.put('/pagamentos/pagamento/:id', function(req,res){
        var pagamento = {}; 
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'Confirmado';
        
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function(erro){
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
        req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        //O campo valor não pode ser vazio e deve ser decimal
        req.assert("pagamento.valor", "Valor é obrigatório e deve ser decimal").notEmpty().isFloat();

        var erros = req.validationErrors();
        //Caso tiver erro de acordo com as validações dos asserts acima, irá retornar um response com o erro e o status code 400(bad request)
        if(erros){
            console.log("erros de validacao encontrados");
            res.status(400).send(erros);
            return;
        }

    //corpo da requisição
    //Como agora o Json enviado no corpo da requisição possui duas chaves "pagamento" e "cartao", nós temos que especificar qual chave que queremos["pagamento"]
        var pagamento = req.body["pagamento"];
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
           //InsertID é uma função do módulo do MYSQL, ou seja, quando for criado um novo pagamento será criada uma url com o id desse pagamento
           pagamento.id = resultado.insertId;
           console.log('pagamento criado');

           if(pagamento.forma_de_pagamento == 'cartao'){
               var cartao = req.body["cartao"];
               console.log(cartao);

              var clienteCartoes = new app.servicos.clienteCartoes();
              clienteCartoes.autoriza(cartao, 
                function(exception, request, response, retorno){
                    //se tiver um erro
                    if(exception){
                        console.log(exception);

                        res.status(400).send(exception);
                        return;

                    }
                    console.log(retorno);

                    res.location('/pagamentos/pagamento/' + pagamento.id);
                    var response = {
                        dados_do_pagamento: pagamento,
                        cartao: retorno,
                        links: [
                            {
                                href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id, 
                                rel:"confirmar",
                                method:"PUT"
                            },
                            {
                            href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                            rel:"cancelar",
                            method: "DELETE"
                            }
                       ]
        
                   }
                    res.status(201).json(response);
                    return;

              });

               
           }else{
           
           res.location('/pagamentos/pagamento/' + pagamento.id);
            var response = {
                dados_do_pagamento: pagamento,
                links: [
                    {
                        href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id, 
                        rel:"confirmar",
                        method:"PUT"
                    },
                    {
                    href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                    rel:"cancelar",
                    method: "DELETE"
                    }
               ]

           }
           //201 é status code de created, ou seja, mostrar na response o código correto no caso
           res.status(201).json(response);
           return;
          }
        }
        });

    
    });
}