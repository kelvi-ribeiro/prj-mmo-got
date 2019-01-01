var crypto = require('crypto');
function UsuarioDAO(connection) {
    this._connection = connection;
    }
    UsuarioDAO.prototype.inserirUsuario = function(usuario, req,res) {    
    const senhaCriptografada = crypto.createHash('md5').update(usuario.senha).digest("hex");
    usuario.senha = senhaCriptografada;
    var dados = {
    operacao: "inserir",
    entity: usuario,
    collection: "usuario",
    callback: function(err, result) {        
    sucessoAutenticacao(req,res,result.ops[0].usuario,result.ops[0].casa)    
    }
    };
    this._connection(dados);
    }
    UsuarioDAO.prototype.autenticar = function(usuario, req,res) {
        const senhaDescriptografada = usuario.senha;
        const senhaCriptografada = crypto.createHash('md5').update(usuario.senha).digest("hex");
        usuario.senha = senhaCriptografada;
        var dados = {
        operacao: "pesquisar",
        entity: usuario,
        collection: "usuario",
        callback: function(err, result) {        
          if(result[0] != undefined){
              sucessoAutenticacao(req,res,result[0].usuario,result[0].casa);              
          }else{
            usuario.senha = senhaDescriptografada;
            res.render('index',{validacao:{},dadosForm:usuario,userNotFound:true});
          }
          /* if(req.session.autorizado){
              res.redirect('jogo');
          }else{
            res.render('index',{validacao:{},dadosForm:usuario,userNotFound:true});
          } */
        }
        };
        this._connection(dados)
        }
    module.exports = function() {
    return UsuarioDAO;
    };
    function sucessoAutenticacao(req,res,usuario,casa){
        req.session.autorizado = true;
        req.session.usuario = usuario;
        req.session.casa = casa;    
        res.redirect('jogo');    
    }