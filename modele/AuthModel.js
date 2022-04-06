/* node JS */
var EmailModel = require('../tools/Email');

module.exports = class AuthModel{

    //User connection
    static loginForAnyOne(db, email, password){
        return new Promise((resolve, reject)=> {
            db.collection("user").find(
                {
                    email : email,
                    password : password
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

    static loginForClient(db, email, password){
        return new Promise((resolve, reject)=> {
            db.collection("user").find(
                {
                    email : email,
                    password : password,
                    type_user_name : "client"
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

    static loginForResto(db, email, password){
        return new Promise((resolve, reject)=> {
            db.collection("user").find(
                {
                    email : email,
                    password : password,
                    type_user_name : "restaurant"
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

    static loginForResponsable(db, email, password){
        return new Promise((resolve, reject)=> {
            db.collection("user").find(
                {
                    email : email,
                    password : password,
                    type_user_name : "responsable"
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

    static loginForLivreur(db, email, password){
        return new Promise((resolve, reject)=> {
            db.collection("user").find(
                {
                    email : email,
                    password : password,
                    type_user_name : "livreur"
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
    static generateCodeInscription(email, name){
        return new Promise((resolve, reject)=> {
            let code = EmailModel.genererCode(email, name);
            let promise = EmailModel.sendCode(email, "Veuillez utiliser ce code pour continuer l'inscription", code);
            promise.then(value =>{
                resolve(value);
            }).catch(error =>{
                console.error(err);
                reject(error);
            });
        });
    }

    //inscription
    static inscription(db, name, email, password, type_user_id, type_user_name, contact, code){
        return new Promise((resolve, reject)=> {
            if(EmailModel.verifierCode(email, name, code)){
                db.collection("user").insertOne(
                    {
                        name : name,
                        email : email,
                        password : password,
                        type_user_id : ObjectId(type_user_id),
                        type_user_name : type_user_name,
                        contact : contact
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
