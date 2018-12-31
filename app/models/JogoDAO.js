function JogoDAO(connection) {
    this._connection = connection;
}

JogoDAO.prototype.gerarParametros = function(usuario) {
    const parametrosJogo = 
    {
    usuario:usuario,
    moedas:15,
    suditos:10,
    temor:Math.floor((Math.random() * 1000)),
    sabedoria:Math.floor((Math.random() * 1000)),
    comercio:Math.floor((Math.random() * 1000)),
    magia:Math.floor((Math.random() * 1000)),
}
    var dados = {
    operacao: "inserir",
    entity: parametrosJogo,
    collection: "jogo",
    callback: function(err, result) {    
    
    }
    };
    this._connection(dados);
}
JogoDAO.prototype.iniciaJogo = function(usuario,res,casa) {    
    var dados = {
    operacao: "pesquisar",
    entity: usuario,
    collection: "jogo",
    callback: function(err, result) {  
        console.log(result[0]);
        res.render('jogo',{imgCasa:casa,jogo:result[0]});
       return;
     }
    };
    this._connection(dados)
        
}
module.exports = function() {
    return JogoDAO;
    };