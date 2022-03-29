/* node JS */

module.exports = class AuthModel{

    //User connection
    static loginForAnyOne(db, req){
        return new Promise((resolve, reject)=> {
            db.collection("user").findOne(
                {
                    email: req.body.email,
                    password: req.body.password
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

    //inscription
    static inscription(db, req){
        return new Promise((resolve, reject)=> {
            db.collection("user").insertOne(
                req.body
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
