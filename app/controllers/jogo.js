module.exports.jogo = function(application,req,res){
    verificaUsuarioAutenticado(req,res);

    var mensagem = '';
    if(req.query.mensagem != ''){
        mensagem = req.query.mensagem;
    }    
    var connection = application.config.dbConnection;        
    var jogoDAO = new application.app.models.JogoDAO(connection);
    jogoDAO.iniciaJogo(req.session.usuario,res,req.session.casa,mensagem);
}

module.exports.sair = function(application,req,res){    
    req.session.destroy(function(err){
        res.render('index',{validacao:{},dadosForm:{},userNotFound:false});
    });
    
}

module.exports.suditos = function(application,req,res){    
    verificaUsuarioAutenticado(req,res);
    res.render('aldeoes');    
}

module.exports.pergaminhos = function(application,req,res){  
    verificaUsuarioAutenticado(req,res);      
    res.render('pergaminhos');
}

module.exports.ordenarAcaoSudito = function(application,req,res){  
    verificaUsuarioAutenticado(req,res);  
    var dadosForm = req.body;

    req.assert('acao','Ação deve ser informada').notEmpty();
    req.assert('quantidade','Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.redirect('jogo?mensagem=E');
        return;
    }    
    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);
    dadosForm.usuario = req.session.usuario;
    jogoDAO.acao(dadosForm);
    res.redirect('jogo?mensagem=S');
}

function verificaUsuarioAutenticado(req,res){
    if(req.session.autorizado !== true){
        res.render('index',{validacao:{},dadosForm:{},userNotFound:false});
        return;
    }
}

