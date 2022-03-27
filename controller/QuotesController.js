const express = require('express');
const router = express.Router();

var QuotesModel = require('../modele/QuotesModel');
var Connection = require('../db/Connection');

router.get('/', (req, get) => {
	res.json({
		status : 200,
		data : "Rien par ici"
	});
});

router.get('/all', (req, res) =>{
    let connection = new Connection();
	let dbpromise = connection.getDB("star-wars-quotes");
    dbpromise.then(function(db){
        const promise = QuotesModel.get(db);
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