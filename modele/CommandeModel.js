module.exports = class CommadeModel{

    //pour le client
    static getCommandeByClient(db, client_id, limit, page_num){
        let skips = limit * (page_num - 1);
        return new Promise((resolve, reject)=> {
            db.collection("commande").find(
                {
                    client_id : ObjectId(client_id)
                }
            )
            .skip(skips).limit(limit).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(error);
					return;
                } else {
                    resolve({
                        "status": 200,
                        "data": result
                    });
                }
            });
        });
    }

    //pour le restaurateur
    static getCommandeByIdResto(db, resto_id, limit, page_num){
        let skips = limit * (page_num - 1);
        return new Promise((resolve, reject)=> {
            db.collection("commande").find(
                {
                    restaurant_id : ObjectId(resto_id),
                    etat : {$gte : 10}
                }
            )
            .skip(skips).limit(limit).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(error);
					return;
                } else {
                    resolve({
                        "status": 200,
                        "data": result
                    });
                }
            });
        });
    }

    //pour le livreur
    static getCommandeByIdLivreur(db, livreur_id, limit, page_num){
        let skips = limit * (page_num - 1);
        return new Promise((resolve, reject)=> {
            db.collection("commande").find(
                {
                    livreur_id : ObjectId(livreur_id),
                    etat : 20
                }
            )
            .skip(skips).limit(limit).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(error);
					return;
                } else {
                    resolve({
                        "status": 200,
                        "data": result
                    });
                }
            });
        });
    }

    static setStateCommande(db, commande_id, etat){
        return new Promise((resolve, reject)=> {
            db.collection("commande").findOneAndUpdate(
                { _id: commande_id },
                {
                    $set: {
                        etat: etat
                    }
                },
                {
                    upsert: true
                }
            ).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(error);
					return;
                } else {
                    resolve({
                        "status": 200,
                        "data": result
                    });
                }
            });
        });
    }

    //faire une commande
    static makeCommande(db, restaurant_id, restaurant_name, prix_global, client_id, client_name, client_contact , date_comande, lieu_adresse_livraison, detail_commande = []){
        return new Promise((resolve, reject)=> {
            db.collection("commande").insertOne(
                {
                    restaurant_id: ObjectId(restaurant_id),
                    restaurant_name: restaurant_name,
                    prix_global: prix_global,
                    client_id: ObjectId(client_id),
                    client_name: client_name,
                    client_contact: client_contact,
                    date_comande: date_comande,
                    lieu_adresse_livraison: lieu_adresse_livraison,
                    livreur_id: "",
                    livreur_name: "",
                    detail_commande : detail_commande,
                    etat : 0
                }
            ).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(error);
					return;
                } else {
                    resolve({
                        "status": 200,
                        "data": result
                    });
                }
            });
        });
    }

    //assigner un liveur  une commande
    static asignLiveur(db, commande_id, livreur_id, livreur_name){
        return new Promise((resolve, reject)=> {
            db.collection("commande").findOneAndUpdate(
                { _id: commande_id },
                {
                    $set: {
                        livreur_id : ObjectId(livreur_id),
                        livreur_name : livreur_name
                    }
                },
                {
                    upsert: true
                }
            ).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(error);
					return;
                } else {
                    resolve({
                        "status": 200,
                        "data": result
                    });
                }
            });
        });
    }
    
}