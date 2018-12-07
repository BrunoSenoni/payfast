
var cluster = require('cluster');
//informações do sistema operacional
var os = require('os');
//Qauntos núcleos a máquina possui
var cpus = os.cpus();
//console.log(cpus);
//fork() gera uma thread(slave) que é filha da thread principal do arquivo do qul foi chamado
//É necessário fazer a condição para ver se o Thread master , pq não se pode fazer um fork() a partir de um slave, criaria um laço infinito de criação de fork()
console.log("executando Thread");

if(cluster.isMaster){
    console.log("Thread master");
//Para cada unidade de processamento será criado um slave
    cpus.forEach(function(){
        cluster.fork();
    });

//Mestre observa eventos dos filhos(slaves)
//worker - informações de cada thread criada pelo fork()
    cluster.on("listening", function(worker){
          console.log("cluster conectado: " + worker.process.pid);
    });

//Verifica se algum núcleo saiu do cluster
cluster.on("exit", worker => {
    console.log("cluster %d desconectado" , worker.process.pid);
    //Se o núcleo for desconectado será criado uma nova thread para reviver
    cluster.fork();
})
    
}else{
    
    console.log("Thread slave");
    //O mestre que recebe as requisições dessas porta e direciona para cada um de seus filhos
    //executar em cada slave o express(index.js), que ouve requisições da porta 3000
    require('./index.js');

    //cluster.fork(), irá dar problema , pois é Thread slave
}


