const express = require('express');
const app = express();
const config = require("./tools/project.config");

// [!] : Pour le local de l'application en http
//const http = require('http').Server(app);

let bodyParser = require('body-parser');

// [!] : middleware pour la structuration des requetes particuliers (ex : POST)
app.use(bodyParser.json()); // Lit l'élément Json dans l'url(s'il y en a)
app.use(bodyParser.urlencoded({ extended: true })); // Supporte les bodies encodés

// [!] : middleware de Gestion du CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

require('./dotenv')

// [!] : definition des routes
app.use('/auth', require("./controller/AuthController"));
app.use('/client/commande', require("./controller/client/CommandeController"));
app.use('/livreur/commande', require("./controller/livreur/CommandeController"));
app.use('/responsable_E_kaly/commande', require("./controller/responsable_E_kaly/CommandeController"));
app.use('/restaurant/commande', require("./controller/restaurant/CommandeController"));

// [!] : middleware qui capture tous les erreurs 404
app.use((req, res, next) => {
	if ( res.status(404) ) {
		res.json({
			code : 404,
			error : true,
			detailed : req.url,
			data : "Error 404"
		});
	} else {
		next();
	}
});

// [!] : demarrage du serveur
const port = process.env.PORT || config.PORT;
const addr = process.env.SERVER_ADDR || 'localhost';

//[!] : demarrage du serveur simple
app.listen(port, function(){
	console.log(`Listening on ${ addr }:${ port }`);
});

//[!] : demarrage du serveur en http
// http.listen(port, function(){
// 	console.log(`Listening on ${ addr }:${ port }`);
// });
