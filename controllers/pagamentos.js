//Atende uma requisição na url /pagamentos a partir de uma chamada com o método GET(HTTP)
module.exports = function(app){
    app.get("/pagamentos", function(req, res){
           res.send("ok");
    });    
}