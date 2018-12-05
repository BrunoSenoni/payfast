var fs = require('fs');
module.exports = function(app){
//O cliente deverá passar dois header para essa requisição: Content-type:application/octet-stream e filename:"nome do arquivo"
    app.post("/upload/imagem", function(req, res){
         console.log('recebendo imagem');
         //o express irá pegar o header da requisição, no qual o cliente colocará no filename o nome do arquivo
         var filename = req.headers.filename;
         req.pipe(fs.createWriteStream('Files/') + filename)

         .on('finish', function(){
             console.log("arquivo escrito");
             res.status(201).send('ok');

         });
    });
}