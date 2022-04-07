const ObjectId = require('mongodb').ObjectId;

module.exports = class LivreurModel{

    static getLivreurWithNbCommandeToDeliver(db, limit, page_num){
        let skips = limit * (page_num - 1);
        limit = parseInt(limit);
        return new Promise((resolve, reject)=> {
            db.collection("user").find(
                {
                    type_user_name:"livreur"
                }
            )
            .skip(skips).limit(limit).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(error);
					return;
                } else {

                    let promise = new Promise((resolve, reject) =>{
                        let resultFinal = [];
                        let i = 0;
                        for(const livreur of result) {
                            i++;
                            db.collection("commande").countDocuments(
                                {
                                    livreur_id : livreur._id.toString(),
                                    etat : {$gte:20, $lt:30}
                                }
                            ).then(function (data){
                                let temp = {
                                    _id : livreur._id,
                                    name : livreur.name,
                                    contact : livreur.contact,
                                    nombre_commande : data
                                }
                                resultFinal.push(temp);

                                if(i == result.length){
                                    if(resultFinal.length != 0){
                                        resolve(resultFinal);
                                    }
                                }
                            });
                        };
                    });

                    promise.then((result)=>{
                        resolve({
                            "status": 200,
                            "data": result
                        });

                    }).catch( error => {
                       reject(error);
                    })
                }
            });
        });
    }
    
}