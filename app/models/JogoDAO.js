function JogoDAO(connection) {
    this._connection = connection;
}

JogoDAO.prototype.gerarParametros = function(usuario) {
    const parametrosJogo = 
    {
    usuario:usuario,
    moeda:15,
    suditos:10,
    temor:Math.floor((Math.random() * 1000)),
    sabedoria:Math.floor((Math.random() * 1000)),
    comercio:Math.floor((Math.random() * 1000)),
    margia:Math.floor((Math.random() * 1000)),
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
module.exports = function() {
    return JogoDAO;
    };