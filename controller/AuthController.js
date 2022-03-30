const express = require('express');
const router = express.Router();

var AuthModel = require('../modele/AuthModel');
var TokenManager = require('../tools/TokenManager');
var Connection = require('../db/Connection');

router.get('/', (req, get) => {
	res.json({
		status : 200,
		data : "Rien par ici"
	});
});

router.post('/login', (req, res) =>{
    let connection = new Connection();
	let dbpromise = connection.getDB("ekaly");
    dbpromise.then(function(db){
        const promise = AuthModel.loginForAnyOne(db, req.body.email, req.body.password);
        promise.then(function(value){
            // on genere le token
		    value.token = TokenManager.generateUsing({ email : req.body.email, password : req.body.password});
            res.json(value);
        }).catch( error => {
            console.error(error);
            res.json({
                status : 400, // reponse http
                error : true, // pour signaler que ceci est une erreur
                detailed : `${error} : concernant la requête infos `, // erreur pour les devs
                data : "Une erreur est survenue lors de la requête" // pour les users
            });
        }).finally(()=>{
            connection.endConnection();
        });
    });
});

router.post('/generateInscriptionCode', (req, res) =>{
    const promise = AuthModel.generateCodeInscription(req.body.email, req.body.name);
    promise.then(function(value){
        if(value){
            res.json({
                status : 200, // reponse http
                error : false, // pour signaler que ceci est une erreur
                data : "Email est envoyé" // pour les users
            });
        }else{
            res.json({
                status : 400, // reponse http
                error : false, // pour signaler que ceci est une erreur
                data : "Email n'as pas pu etre envoyé" // pour les users
            });
        }
    }).catch( error => {
        console.error(error);
        res.json({
            status : 400, // reponse http
            error : true, // pour signaler que ceci est une erreur
            detailed : `${error} : concernant la requête infos `, // erreur pour les devs
            data : "Une erreur est survenue lors de la requête" // pour les users
        });
    });
});

router.post('/inscription', (req, res) =>{
    let connection = new Connection();
	let dbpromise = connection.getDB("ekaly");
    dbpromise.then(function(db){
        const promise = AuthModel.inscription(db, req.body.name, req.body.email, req.body.password, req.body.type_user_id, req.body.type_user_name, req.body.contact, req.body.code);
        promise.then(function(value){
            res.json(value);
        }).catch( error => {
            console.error(error);
            res.json({
                status : 400, // reponse http
                error : true, // pour signaler que ceci est une erreur
                detailed : `${error} : concernant la requête infos `, // erreur pour les devs
                data : "Une erreur est survenue lors de la requête" // pour les users
            });
        }).finally(()=>{
            connection.endConnection();
        });
    });
});

module.exports = router;