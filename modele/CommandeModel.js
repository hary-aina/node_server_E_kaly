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
        limit = parseInt(limit);
        let skips = limit * (page_num - 1);
        return new Promise((resolve, reject)=> {
            db.collection("commande").find(
                {
                    restaurant_id : resto_id,
                    etat : {$gte: 10, $lt:25}
                }
            )
            .skip(skips).limit(limit).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
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

    //pour responsable ekaly
    static getCommandePretaLiver(db, limit, page_num){
        limit = parseInt(limit);
        let skips = limit * (page_num - 1);
        return new Promise((resolve, reject)=> {
            db.collection("commande").find(
                {
                    livreur_id : "",
                    etat : 20
                }
            )
            .skip(skips).limit(limit).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
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
        limit = parseInt(limit);
        let skips = limit * (page_num - 1);
        return new Promise((resolve, reject)=> {
            db.collection("commande").find(
                {
                    livreur_id : livreur_id,
                    etat : {$gte:20, $lt:30}
                }
            )
            .skip(skips).limit(limit).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
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
                        etat: parseInt(etat)
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
    static modifierCommande(db, commande_id, prix_global, revient_global, detail_commande, lieu_adresse_livraison, client_contact){
        return new Promise((resolve, reject)=> {
            detail_commande.plat_prix = parseFloat(detail_commande.plat_prix);
            detail_commande.plat_revient = parseFloat(detail_commande.plat_revient);
            db.collection("commande").findOneAndUpdate(
                { _id: new ObjectId(commande_id) },
                {
                    $set: {
                        prix_global : parseFloat(prix_global),
                        revient_global : parseFloat(revient_global),
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
    static makeCommande(db, restaurant_id, restaurant_name, prix_global, revient_global, client_id, client_name, client_contact , date_comande, lieu_adresse_livraison, detail_commande = []){
        return new Promise((resolve, reject)=> {
            detail_commande.plat_prix = parseFloat(detail_commande.plat_prix);
            detail_commande.plat_revient = parseFloat(detail_commande.plat_revient);
            db.collection("commande").insertOne(
                {
                    restaurant_id: restaurant_id,
                    restaurant_name: restaurant_name,
                    prix_global: parseFloat(prix_global),
                    revient_global: parseFloat(revient_global),
                    client_id: client_id,
                    client_name: client_name,
                    client_contact: client_contact,
                    date_comande: new Date(date_comande),
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
    static asignLiveur(db, commande_array, livreur_id, livreur_name){
        //console.log(commande_array);
        return new Promise((resolve, reject)=> {
            let i = 0;
            for(const commande of commande_array){
                i++;
                db.collection("commande").findOneAndUpdate(
                    { _id: new ObjectId(commande._id) },
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

                        if(i == commande_array.length){
                            resolve({
                                "status": 200,
                                "data": data.value
                            });
                        }

                    }else{
                        reject(data);
                    }
                    return;
                });
            }
        });
    }

    //get board by restaurant
    static getBoardResto(db, resto_id){
        return new Promise((resolve, reject)=> {
            db.collection("commande").aggregate(
                [
                    { 
                        $match : {
                            restaurant_id : resto_id,
                            etat : 30
                        }
                    },
                    {
                        $group: {
                            _id : resto_id,
                            chiffre_affaire : { $sum : "$prix_global"},
                            cout : { $sum : "$revient_global" },
                            benefice : { $sum : { $subtract : ["$prix_global", "$revient_global"]}}
                        }
                    }
                ]
            ).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
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

    //get board by day by restaurant
    static getBoardRestoByDay(db, resto_id){
        return new Promise((resolve, reject)=> {
            db.collection("commande").aggregate(
                [
                    { 
                        $match : {
                            restaurant_id : resto_id,
                            etat : 30
                        }
                    },
                    {
                        $group: {
                            _id : {day: { $dayOfMonth: "$date_comande"}, month: { $month : "$date_comande" }, year: { $year: "$date_comande" }},
                            chiffre_affaire : { $sum : "$prix_global"},
                            cout : { $sum : "$revient_global" },
                            benefice : { $sum : { $subtract : ["$prix_global", "$revient_global"]}}
                        }
                    },
                    { 
                        $sort : { 
                            _id: 1
                        } 
                    }
                ]
            ).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
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
    
    //get board by ekaly
    static getBoardEkaly(db){
        return new Promise((resolve, reject)=> {
            db.collection("commande").aggregate(
                [
                    { 
                        $match : {
                            etat : 30
                        }
                    },
                    {
                        $group: {
                            _id : "$restaurant_id",
                            restaurant_name : { $first : "$restaurant_name" },
                            chiffre_affaire : { $sum : "$prix_global"},
                            cout : { $sum : "$revient_global" },
                            benefice : { $sum : { $subtract : ["$prix_global", "$revient_global"]}}
                        }
                    }
                ]
            ).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
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