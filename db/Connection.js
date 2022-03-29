const { MongoClient } = require("mongodb");
const connectionString = "mongodb+srv://aina:aina@ekaly.wxuqe.mongodb.net/ekaly?retryWrites=true&w=majority";
function Connection(){
    this.connexion;
    this.client = new MongoClient(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

//acceder a la base de données
Connection.prototype.getDB = function(database) {
    return new Promise((resolve, reject)=>{
        this.client.connect(function (err, db) {
            if (err || !db) {
                console.error("erreur de la connection " + err);
                reject(err); 
            }else{
                //console.log("Successfully connected to MongoDB.");
                this.connexion = db.db(database);
                resolve(this.connexion);
            }     
        });
    });
};

//fermer la connexion base et serveur
Connection.prototype.endConnection = function() {
    //console.log("Successfully disconnected to MongoDB.");
    this.client.close();
}
    

module.exports = Connection;