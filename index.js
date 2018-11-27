//Carrega o que foi retornado na função(que está com o module.exports) do arquivo custom-express.js, esse () invoca o objeto retornado
var app = require('./config/custom-express')();
//Função listen faz com que a aplicação fique ouvindo uma determinada porta
app.listen(3000, function(){
    console.log("servidor rodando na porta 3000");
});