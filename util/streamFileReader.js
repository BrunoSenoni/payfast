//Lib file system
var fs = require('fs');
//Cria um fluxo de leitura
fs.createReadStream('Moon.jpg')
 .pipe(fs.createWriteStream('imagem-com-stream.jpg')
 .on('finish', function(){
    console.log("arquivo escrito com stream");
}));