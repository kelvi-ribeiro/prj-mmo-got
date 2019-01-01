var mongo = require("mongodb").MongoClient;
var assert = require("assert");
const url = "mongodb://localhost:27017";
const dbName = "got";
var connMongoDB = function(dados) {
mongo.connect(url, function(err, client) {
assert.equal(null, err);
console.log("Connected successfully to server");
const db = client.db(dbName);
query(db, dados);
client.close();
    });
};
function query(db, dados) {
    var collection = db.collection(dados.collection);
    switch (dados.operacao) {
        case "inserir":            
            collection.insertOne(dados.entity, dados.callback);
            break;
        case "atualizar":            
            collection.updateOne(
                dados.entity[0],
                dados.entity[1]
            );
            break;
        case "deletar": 
            console.log(dados.entity)           
            collection.deleteOne(
                dados.entity,
                dados.callback
            );
            break;
        case "pesquisar":
            collection.find(dados.entity).toArray(dados.callback)
            break;
        default:       
    }
}
module.exports = function() {
return connMongoDB;
};