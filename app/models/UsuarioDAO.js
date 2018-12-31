function UsuarioDAO(connection) {
    this._connection = connection;
    }
    UsuarioDAO.prototype.inserirUsuario = function(usuario, res) {
    var dados = {
    operacao: "inserir",
    usuario: usuario,
    collection: "usuarios",
    callback: function(err, result) {
    res.send("olá Marilene");
    }
    };
    this._connection(dados);
    };
    module.exports = function() {
    return UsuarioDAO;
    };