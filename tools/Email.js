const nodemailer = require('nodemailer');
const TokenManager = require("../tools/TokenManager");

const duration = 10 //dix second

module.exports = class Email {
  
  //avoir le code d'un string
  static codeString(chaine){
    let tabChar = Array.from(chaine);
    let result = 0;
    tabChar.forEach(charactere => {
      result = result + charactere.charCodeAt();
    });
    return result;
  }

  //generer code de confirmation (inscription)
  static genererCode(email, pseudo) {
    // const token = TokenManager.generateUsing(email + pseudo, duration);
    // const partie2 = token.split('.')[1];
    // return partie2.substr(20, 10); // sur fa fixe sy miovaova
    let date = new Date();
    date = date.getDate()+""+date.getFullYear()+""+date.getMonth();
    let result1 = Email.codeString(pseudo);
    let result2 = Email.codeString(email)+result1;
    let result3 = Email.codeString(date)+result1;
    return result2+""+result1+""+result3;
  }

  //verifier code de confirmation (inscription)
  static verifierCode(email, pseudo, code) {
    // const token = TokenManager.generateUsing(email + pseudo, duration);
    // const partie2 = token.split('.')[1];
    // return partie2.substr(20, 10) == code; // sur fa fixe sy miovaova
    let date = new Date();
    date = date.getDate()+""+date.getFullYear()+""+date.getMonth();
    let result1 = Email.codeString(pseudo);
    let result2 = Email.codeString(email)+result1;
    let result3 = Email.codeString(date)+result1;
    return (result2+""+result1+""+result3) == code;
  }
  
  //generer code de confirmation (oublier mot de passe)
  static genererCodeMDP(email) {
    // let date = new Date();
    // date = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
    // const token = TokenManager.generateUsing(date + email, duration);
    // const partie2 = token.split('.')[1];
    // return partie2.substr(20, 10); // sur fa fixe sy miovaova
    let date = new Date();
    let result1 = Email.codeString(date.getDate()+"");
    let result2 = Email.codeString(date.getMonth()+"");
    let result4 = Email.codeString(email);
    return (result1+result4)+""+(result4+result2)+""+(result2+result1+result4);
  }

  //verifier code de confirmation (oublier mot de passe)
  static verifierCodeMDP(email, code) {
    // let date = new Date();
    // date = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
    // const token = TokenManager.generateUsing(date + email, duration);
    // const partie2 = token.split('.')[1];
    // return partie2.substr(20, 10) == code; // sur fa fixe sy miovaova
    let date = new Date();
    let result1 = Email.codeString(date.getDate()+"");
    let result2 = Email.codeString(date.getMonth()+"");
    let result4 = Email.codeString(email);
    return (result1+result4)+""+(result4+result2)+""+(result2+result1+result4) == code;  
  }

  /**
	 * Envoye d'un email lors de l'inscription
	 * @params {string} email
	 * @params {string} code
	 * @return bool
	 */
	static sendCode(email, message, code) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ekalymailer@gmail.com',
        pass: 'ekaly1234'
      },
      tls: {
        rejectUnauthorized: false
      }
    });  
    let mailOptions = {
      from: 'ekalymailer@gmail.com',
      to: email,
      subject: message,
      text: code
    };

    return new Promise((resolve, reject)=>{
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            resolve(false);
        } else {
            console.log('Email sent: ' + info.response);
            resolve(true);
        }
      })
    })
  }

    
}
