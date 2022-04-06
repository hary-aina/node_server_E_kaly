const ObjectId = require('mongodb').ObjectId;

module.exports = class PlatModel{

    static getPlat(db, limit, page_num){
        let skips = limit * (page_num - 1);
        limit = parseInt(limit);
        return new Promise((resolve, reject)=> {
            db.collection("plat").find(
                {
                    etat : 10
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

    static searchPlat(db, stringToSearch, limit, page_num){
        let skips = limit * (page_num - 1);
        limit = parseInt(limit);
        return new Promise((resolve, reject)=> {
            db.collection("plat").find(
                {
                    $or : [ 
                        { name: new RegExp(stringToSearch, 'i') },
                        { restaurant_name: new RegExp(stringToSearch, 'i') },
                        { categorie_name: new RegExp(stringToSearch, 'i') },
                        { description: new RegExp(stringToSearch, 'i') },
                    ],
                    $and: [
                        { etat : 10}
                    ]
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

    static getPlatByRestaurant(db, resto_id, limit, page_num){
        limit = parseInt(limit);
        let skips = limit * (page_num - 1);
        return new Promise((resolve, reject)=> {
            db.collection("plat").find(
                {
                    restaurant_id : resto_id,
                    etat : 10
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

    static getPlatByRestaurantOwner(db, resto_id, limit, page_num){
        limit = parseInt(limit);
        let skips = limit * (page_num - 1);
        return new Promise((resolve, reject)=> {
            db.collection("plat").find(
                {
                    restaurant_id : resto_id
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

    static manageVisibilityOfPlatByRestaurant(db, resto_id, plat_id, etat){
        return new Promise((resolve, reject)=> {
            db.collection("plat").findOneAndUpdate(
                { restaurant_id: resto_id, _id: new ObjectId(plat_id) },
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
    
}