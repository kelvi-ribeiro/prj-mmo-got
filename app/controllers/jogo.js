module.exports.jogo = function(application,req,res){
    if(req.session.autorizado){
        res.render('jogo')
    }else{
        res.render('index',{validacao:{},dadosForm:{},userNotFound:false})
    }
}