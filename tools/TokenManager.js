const jwt = require("jsonwebtoken");


const token_conf = require("./token.config"); // fichier de config pour notre moteur
const key = token_conf.KEY; // cle privee pour chiffrer

module.exports = class TokenManager {
	
	/**
	 * Genere un token pour un client en fonction d'une chaine de caractere
	 * On peut aussi specifier la duree de validite
	 * @params {JSON} data
	 * @params {string|number|undefined} duration
	 * @return {string}
	 */
	static generateUsing ( data, duration ) {
		const options = {
			// on prend la duree en parametre si c'est definie
			// on prend celle du fichier de config sinon
			expiresIn : duration || token_conf.DURATION
		};
		return jwt.sign({ data : data }, key, options );
	}

	/**
	 * Verifie un token venant d'un client
	 * throw une Exception si le token n'est pas valide
	 * @params {string} token
	 * @params {Function} onSuccess
	 * @params {Function} onError
	 * @returns {JSON}
	 */
	static verify (token, onSuccess, onError) {
		try {	
			const temp = jwt.verify(token, key);
			if ( onSuccess ) {
				onSuccess(temp);
			}
			return temp; // un token valide peut se faire decrypter en l'objet originale
		} catch(e) {
			if ( onSuccess == undefined ) {
				throw e;
			}
			if ( onError ) {
				onError( e ); 
			}
		}
	}
}