var express = require("express");
var path = require('path');
var fs = require('fs');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var app = express();
var archivoHTML;

app.use(bodyParser.urlencoded());

var transporter = nodemailer.createTransport('smtps://ladoservidor2016%40gmail.com:ladosrv2016@smtp.gmail.com');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function enviarCorreo(mjs){
	var mailOptions = {
	    from: '"Lado Del Servidor 🐶" <ladoservidor2016@gmail.com>',
	    to: 'gchavarria@ucenfotec.ac.cr',
	    subject: 'Laboratorio numero 1 🖥 ',
	    text: mjs,
	    html: '<b>' + mjs + '</b>' // html body
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log('asdasdasda',error);
	    }
	    console.log('Mensaje enviado!: ' + info.response);
	});
}

function leerHTML(archivo){
	return fs.readFileSync(__dirname + archivo,'utf8');
}

app.get("/", function(req, res){
	archivoHTML = leerHTML('/index.html');
	res.send(archivoHTML);
	res.end();
});

app.post("/", function(req, res){
	archivoHTML = leerHTML('/index.html');
  enviarCorreo("Pregunta 1: Considera que el trato de los choferes es? " + req.body.pUno + "<br>" +
  "Pregunta 2: Considera que las unidades de buses se encuentran en ___ estado? " + req.body.pDos + "<br>" +
  "Pregunta 3: Considera que la tarifa es justa? " +req.body.pTres + "<br>" +
  "Pregunta 4: Considera que los asientos están limpios y son cómodos? "+req.body.pCuatro + "<br>" +
  "Pregunta 5: Podría darnos una opinión general del servicio? " + req.body.pSeis);
	res.send(archivoHTML);
  console.log('Encuesta enviada!');
	res.end();
});

app.listen(3000);
