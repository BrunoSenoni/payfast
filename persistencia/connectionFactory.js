var mysql = require('mysql');
//Essa função cria a conexão
function createDBConnection(){
    return mysql.createConnection({
      host:'localhost',
      user: 'root',
      password: 'teste',
      database: 'payfast'
    });
}
var connection = createDBConnection();
connection.connect(function(err){
if(err){
    return console.error('erro' + err.message);
}
    console.log('Connected to the MySQL server');
});


module.exports = function(){
    return createDBConnection;
}