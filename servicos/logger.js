//Pacote para logger
//É útil pois todos os logs ficam registrados em local e melhor para leitura se comparado com o log no console do cmd
var winston = require('winston');
var fs = require('fs');
//utiliza o file stream e verifica se a pasta "logs" existe e se não tiver ele irá criar a pasta 
if(!fs.existsSync('logs')){
    fs.mkdir('logs');
}

module.exports = winston.createLogger({
    
    transports: [
        new winston.transports.File({
             level:'info',
             //Local onde irá escrever o log
             filename: "logs/payfast.log",
             maxsize: 100000,
             maxFile: 10
        })
    ]
});
