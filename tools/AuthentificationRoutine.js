const TokenManager = require("../tools/TokenManager");

const AuthentificationRoutine = {};

AuthentificationRoutine.check = (req, res, next) => {

	next();

	// url sans protection
	// let exceptions = [
	// 	'/login', '/inscription', '/logAdmin', 
	// 	'/ville', '/interet', '/photo',
	// 	'/generercode', '/confirmcode', '/verifemail',
	// 	'/generercodeMDP', '/loginAndCode'
	// ];
	// let filtre = exceptions.filter(url => req.url.startsWith(url));
	// if ( filtre.length > 0 ) {
	// 	next();
	// } else {		
	// 	let token = '';
	// 	if ( req.method == 'GET' ) {
	// 		token = req.query.token; // le token doit figurer sur l'url 
	// 	} else if ( req.method == 'POST' ) {
	// 		token = req.body.token; // le token doit figurer dans le corps de la reponse
	// 	} else if ( req.params['token'] != undefined) {
	// 		token = req.params.token;
	// 	}
	// 	if ( token == '' || token == undefined || token == null ) {
	// 		// si toute verification echoue, on verifie le header en dernier recours
	// 		token = req.headers['token'] || '';
	// 	}
		
	// 	const onSuccess = () => {
	// 		next(); // on poursuit
	// 	};
	// 	const onError = err => {
	// 		res.json({
	// 			code : 400,
	// 			error : true,
	// 			detailed : err,
	// 			data : 'Session invalide, manquante ou expirée'
	// 		});
	// 	};
	// 	TokenManager.verify(token, onSuccess, onError);	
	// }
}

module.exports = AuthentificationRoutine;