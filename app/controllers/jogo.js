module.exports.jogo = function(application,req,res){
    verificaUsuarioAutenticado(req,res);

    var comandoInvalido = 'N';
    if(req.query.comandoInvalido === 'S'){
        comandoInvalido = 'S';
    }
    console.log('comando_invalido',comandoInvalido)
    var connection = application.config.dbConnection;        
    var jogoDAO = new application.app.models.JogoDAO(connection);
    jogoDAO.iniciaJogo(req.session.usuario,res,req.session.casa,comandoInvalido);
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
        res.redirect('jogo?comandoInvalido=S');
        return;
    }    
    res.send('Tudo ok');
}

function verificaUsuarioAutenticado(req,res){
    if(req.session.autorizado !== true){
        res.render('index',{validacao:{},dadosForm:{},userNotFound:false});
        return;
    }
}

