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

    static getPlatByRestaurant(db, resto_id, limit, page_num){
        let skips = limit * (page_num - 1);
        return new Promise((resolve, reject)=> {
            db.collection("plat").find(
                {
                    restaurant_id : ObjectId(resto_id),
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

    static manageVisibilityOfPlatByRestaurant(db, resto_id, plat_id, etat){
        return new Promise((resolve, reject)=> {
            db.collection("plat").findOneAndUpdate(
                { restaurant_id: resto_id, _id: plat_id },
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
    
}