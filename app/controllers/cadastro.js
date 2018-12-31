module.exports.cadastro = function(application,req,res){
    res.render('cadastro',{validacao:{},dadosForm:{}});
}

module.exports.cadastrar = function(application,req,res){
    var dadosForm = req.body;
    req.assert('nome','Nome Não pode ser vazio').notEmpty();
    req.assert('nome','Nome deve entre 3 a 20 caracteres').len(3,20);
    req.assert('usuario','Usuário Não pode ser vazio').notEmpty();
    req.assert('usuario','Usuário deve entre 3 a 20 caracteres').len(3,20);
    req.assert('senha','Senha Não pode ser vazio').notEmpty();
    req.assert('casa','Casa Não pode ser vazio').notEmpty();
    var erros = req.validationErrors();
    if(erros){
        res.render('cadastro',{validacao:erros, dadosForm:dadosForm});
        return;
    }
    var connection = application.config.dbConnection;    
    var usuarioDAO = new application.app.models.UsuarioDAO(connection);
    usuarioDAO.inserirUsuario(dadosForm,res);
}
