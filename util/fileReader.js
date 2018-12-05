//Lib file system
var fs = require('fs');

fs.readFile('Moon.jpg', function(error, buffer){
    console.log("arquivo lido");

    fs.writeFile('Moon2.jpg', buffer, function(){
      console.log("arquivo escrito");
    });

});