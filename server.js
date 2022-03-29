const express = require('express');
const app = express();

// [!] : Pour le local de l'application en http
const http = require('http').Server(app);

// [!] : Pour la production de l'application en https
// const fs = require('fs');
// const options = {
//   key: fs.readFileSync('ssl.pvk'),
//   cert: fs.readFileSync('ssl.crt'),
//   ca: [
//           fs.readFileSync('ca_bundle.crt')

//        ]
// };
//const https = require('https').createServer(options, app);


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


// MongoClient.connect(connectionString, { useUnifiedTopology: true },
//   )
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('star-wars-quotes')
//     const quotesCollection = db.collection('quotes')

//     // ========================
//     // Middlewares
//     // ========================
//     app.set('view engine', 'ejs')
//     app.use(bodyParser.urlencoded({ extended: true }))
//     app.use(bodyParser.json())
//     app.use(express.static('public'))

//     // ========================
//     // Routes
//     // ========================
//     app.get('/', (req, res) => {
//       db.collection('quotes').find().toArray()
//         .then(quotes => {
//           res.render('index.ejs', { quotes: quotes })
//         })
//         .catch( error => {
//           res.sendFile('D:/WEB AVANCE/crud-demo-master/index.html');
//         });
//     })

//     app.post('/quotes', (req, res) => {
//       quotesCollection.insertOne(req.body)
//         .then(result => {
//           res.redirect('/')
//         })
//         .catch(error => console.error(error))
//     })

//     app.put('/quotes', (req, res) => {
//       quotesCollection.findOneAndUpdate(
//         { name: 'Yoda' },
//         {
//           $set: {
//             name: req.body.name,
//             quote: req.body.quote
//           }
//         },
//         {
//           upsert: true
//         }
//       )
//         .then(result => res.json('Success'))
//         .catch(error => console.error(error))
//     })

//     app.delete('/quotes', (req, res) => {
//       quotesCollection.deleteOne(
//         { name: req.body.name }
//       )
//         .then(result => {
//           if (result.deletedCount === 0) {
//             return res.json('No quote to delete')
//           }
//           res.json('Deleted Darth Vadar\'s quote')
//         })
//         .catch(error => console.error(error))
//     })

//   })
//   .catch(console.error);


// [!] : demarrage du serveur
const port = process.env.PORT || config.PORT;
const addr = process.env.SERVER_ADDR || 'localhost';

//[!] : demarrage du serveur en http
http.listen(port, function(){
	console.log(`Listening on ${ addr }:${ port }`);
});

//[!] : demarrage du serveur en https
// https.listen(port, function(){
// 	console.log(`Listening on ${ addr }:${ port }`);
// });
