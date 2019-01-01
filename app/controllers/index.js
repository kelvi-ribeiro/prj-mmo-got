module.exports.index = function(application,req,res){    
    if(!req.session.autorizado){
        res.render('index',{validacao:{},dadosForm:{},userNotFound:false})
    }else{        
        res.redirect('jogo');    
    }
}

module.exports.autenticar = function(application,req,res){
    var dadosForm = req.body;
    req.assert('usuario','Usuário não pode ser vazio').notEmpty();
    req.assert('senha','Senha não pode ser vazio').notEmpty();
    var erros = req.validationErrors();
    if(erros){
        res.render('index',{validacao:erros,dadosForm:dadosForm,userNotFound:false});
        return;
    }
    var connection = application.config.dbConnection;
    var usuarioDAO = new application.app.models.UsuarioDAO(connection);
    usuarioDAO.autenticar(dadosForm,req,res);
    //res.send('Tudo ok para criar a sessão');
}