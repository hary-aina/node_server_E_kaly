const express = require('express');
const router = express.Router();

var CommandeModel = require('../../modele/CommandeModel');
var Connection = require('../../db/Connection');

router.get('/', (req, get) => {
	res.json({
		status : 200,
		data : "Rien par ici"
	});
});

//voir mes commandes
router.get('/voirCommandePretaLiver/:limit/:page_num', (req, res) =>{
    let connection = new Connection();
	let dbpromise = connection.getDB("ekaly");
    dbpromise.then(function(db){
        const promise = CommandeModel.getCommandePretaLiver(db, req.params.limit, req.params.page_num);
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

//voir mes commandes
router.get('/getCommandeByIdLivreur/:livreur_id/:limit/:page_num', (req, res) =>{
    let connection = new Connection();
	let dbpromise = connection.getDB("ekaly");
    dbpromise.then(function(db){
        const promise = CommandeModel.getCommandeByIdLivreur(db, req.params.livreur_id, req.params.limit, req.params.page_num);
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

//Asigner un livreaur
router.post('/asignLivraison', (req, res) =>{
    let connection = new Connection();
	let dbpromise = connection.getDB("ekaly");
    dbpromise.then(function(db){
        const promise = CommandeModel.asignLiveur(db, req.body.commande_array, req.body.livreur_id, req.body.livreur_name);
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

//tableau de board
router.get('/dashboard', (req, res)=>{
    let connection = new Connection();
	let dbpromise = connection.getDB("ekaly");
    dbpromise.then(function(db){
        const promise = CommandeModel.getBoardEkaly(db);
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