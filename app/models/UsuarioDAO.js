function UsuarioDAO(connection) {
    this._connection = connection;
    }
    UsuarioDAO.prototype.inserirUsuario = function(usuario, res) {
    var dados = {
    operacao: "inserir",
    usuario: usuario,
    collection: "usuario",
    callback: function(err, result) {
    console.log('hehe',result.ops[0].nome)
    res.send(`Olá ${result.ops[0].nome}`);
    }
    };
    this._connection(dados);
    }
    UsuarioDAO.prototype.autenticar = function(usuario, req,res) {
        var dados = {
        operacao: "pesquisar",
        usuario: usuario,
        collection: "usuario",
        callback: function(err, result) {        
          if(result[0] != undefined){
              req.session.autorizado = true;
              req.session.usuario = result[0].usuario;
              req.session.casa = result[0].casa
          }
          if(req.session.autorizado){
              res.redirect('jogo');
          }else{
            res.render('index',{validacao:{},dadosForm:usuario,userNotFound:true});
          }
        }
        };
        this._connection(dados)
        }
    module.exports = function() {
    return UsuarioDAO;
    };