/* importar o MongoDB */
var mongo = require('mongodb');
    var conMongoDB = function(){        
    var db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost', // String contendo o endereço do servidor,
            27017,
            {}
        ),
        {}
    );
    return db;
}

module.exports = function(){
    return conMongoDB;
}
    

