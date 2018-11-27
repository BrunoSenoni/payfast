var mysql = require('mysql');
//Essa função cria a conexão
function createDBConnection(){
    return mysql.createConnection({
      host:'localhost',
      user: 'root',
      password: '',
      database: 'payfast'
    });
}

module.exports = function(){
    return createDBConnection;
}