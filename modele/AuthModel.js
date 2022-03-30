/* node JS */
var EmailModel = require('../tools/Email');

module.exports = class AuthModel{

    //User connection
    static loginForAnyOne(db, req){
        return new Promise((resolve, reject)=> {
            db.collection("user").find(
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

    //generate code and send to mail
    static generateCodeInscription(req){
        return new Promise((resolve, reject)=> {
            let code = EmailModel.genererCode(req.body.email, req.body.name);
            let promise = EmailModel.sendCode(req.body.email, "Veuillez utiliser ce code pour continuer l'inscription", code);
            promise.then(value =>{
                resolve(value);
            }).catch(error =>{
                console.error(err);
                reject(error);
            });
        });
    }

    //inscription
    static inscription(db, req){
        return new Promise((resolve, reject)=> {
            if(EmailModel.verifierCode(req.body.email, req.body.name, req.body.code)){
                db.collection("user").insertOne(
                    {
                        name : req.body.name,
                        email : req.body.email,
                        password : req.body.password,
                        type_user_id : ObjectId(req.body.type_user_id),
                        type_user_name : req.body.type_user_name,
                        contact : req.body.contact
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
            }else{
                resolve({
                    "status": 400,
                    "data": "vérification du code de confirmation échouer"
                });
            }
        });
    }
    
}
