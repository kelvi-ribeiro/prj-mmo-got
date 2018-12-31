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
JogoDAO.prototype.iniciaJogo = function(usuario,res,casa,mensagem) {        
    var dados = {
    operacao: "pesquisar",
    entity: usuario,
    collection: "jogo",
    callback: function(err, result) {          
        res.render('jogo',{imgCasa:casa,jogo:result[0],mensagem:mensagem});
       return;
     }
    };
    this._connection(dados);        
}
JogoDAO.prototype.acao = function(acao) {
    var date = new Date();    
    var tempo = null;
    switch(parseInt(acao.acao)){
        case 1: tempo = 1 * 60 * 60000;
        break;
        case 2: tempo = 2 * 60 * 60000;
        break;
        case 3: tempo = 5 * 60 * 60000;
        break;
        case 4: tempo = 5 * 60 * 60000;
        default:
    }
    acao.acaoTerminaEm  = date.getTime() + tempo; 
    var dados = {
    operacao: "inserir",
    entity: acao,
    collection: "acao",
    callback: function(err, result) {    
    
    }
    };
    this._connection(dados);
}

JogoDAO.prototype.getAcoes = function(res,usuario) {            
    var dados = {
    operacao: "pesquisar",
    entity: usuario,
    collection: "acao",
    callback: function(err, result) {          
        res.render('pergaminhos',{acoes:result})
     }
    };
    this._connection(dados);        
}

module.exports = function() {
    return JogoDAO;
    };