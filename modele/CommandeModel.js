const ObjectId = require('mongodb').ObjectId; 

module.exports = class CommadeModel{

    //pour le client
    static getCommandeByClient(db, client_id, limit, page_num){
        limit = parseInt(limit);
        let skips = limit * (page_num - 1);
        return new Promise((resolve, reject)=> {
            db.collection("commande").find(
                {
                    client_id : client_id,
                    etat: {$gte: 0, $lt:30},
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
                    restaurant_id : resto_id,
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
                    livreur_id : livreur_id,
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
                { _id: new ObjectId(commande_id) },
                {
                    $set: {
                        etat: etat
                    }
                },
                {
                    upsert: true
                }
            ).then(function (data) {
                if(data.ok == 1){
                    resolve({
                        "status": 200,
                        "data": data.value
                    });
                }else{
                    reject(data);
                }
                return;
            });
        });
    }

    //modifier ma commande
    static modifierCommande(db, commande_id, prix_global, detail_commande, lieu_adresse_livraison, client_contact){
        return new Promise((resolve, reject)=> {
            db.collection("commande").findOneAndUpdate(
                { _id: new ObjectId(commande_id) },
                {
                    $set: {
                        prix_global : prix_global, 
                        detail_commande : detail_commande, 
                        lieu_adresse_livraison : lieu_adresse_livraison, 
                        client_contact : client_contact
                    }
                },
                {
                    upsert: true
                }
            ).then(function (data) {
                //reject(err);
                //console.log(data.ok);
                if(data.ok == 1){
                    resolve({
                        "status": 200,
                        "data": data.value
                    });
                }else{
                    reject(data);
                }
                return;
            });
        });
    }

    //faire une commande
    static makeCommande(db, restaurant_id, restaurant_name, prix_global, client_id, client_name, client_contact , date_comande, lieu_adresse_livraison, detail_commande = []){
        return new Promise((resolve, reject)=> {
            db.collection("commande").insertOne(
                {
                    restaurant_id: restaurant_id,
                    restaurant_name: restaurant_name,
                    prix_global: prix_global,
                    client_id: client_id,
                    client_name: client_name,
                    client_contact: client_contact,
                    date_comande: date_comande,
                    lieu_adresse_livraison: lieu_adresse_livraison,
                    livreur_id: "",
                    livreur_name: "",
                    detail_commande : detail_commande,
                    etat : 0
                }
            ).then(function (data) {
                //console.error("insertCount : "+data.insertedCount, "ok : "+data.ops);
                if(data.insertedCount == 1){
                    resolve({
                        "status": 200,
                        "data": data.ops
                    });
                }else{
                    reject(data);
                }
                return;
            });
        });
    }

    //assigner un liveur  une commande
    static asignLiveur(db, commande_id, livreur_id, livreur_name){
        return new Promise((resolve, reject)=> {
            db.collection("commande").findOneAndUpdate(
                { _id: new ObjectId(commande_id) },
                {
                    $set: {
                        livreur_id : livreur_id,
                        livreur_name : livreur_name
                    }
                },
                {
                    upsert: true
                }
            ).then(function (data) {
                if(data.ok == 1){
                    resolve({
                        "status": 200,
                        "data": data.value
                    });
                }else{
                    reject(data);
                }
                return;
            });
        });
    }
    
}