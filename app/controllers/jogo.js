module.exports.jogo = function(application,req,res){
    if(req.session.autorizado !== true){
        res.render('index',{validacao:{},dadosForm:{},userNotFound:false});
        return;
    }
    var connection = application.config.dbConnection;        
    var jogoDAO = new application.app.models.JogoDAO(connection);
    jogoDAO.iniciaJogo(req.session.usuario,res,req.session.casa);
}

module.exports.sair = function(application,req,res){    
    req.session.destroy(function(err){
        res.render('index',{validacao:{},dadosForm:{},userNotFound:false});
    });
    
}