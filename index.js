var express = require('express');
var session = require('express-session');
var back = require('express-back');
var diskdb = require('diskdb');
var i18n = require("i18n");
var qs = require('qs');
var _ = require('lodash');
var bodyParser = require('body-parser');
var expressMail = require('express-mailer');
var app = express();


db = diskdb.connect('datastorage', ['equipes']);

app.set('port', (process.env.PORT || 5000));


app.use(session({
  secret: 'kamitbrains-P7w9Z[j#?}pYzFYA6U?Gef@!+2hapKHT+tk#',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(back());

app.use(express.static(__dirname + '/public'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


/*
* language prefere
*/


i18n.configure({
  locales:['fr', 'en'],
  directory: __dirname + '/locales',

  fallbacks:{'fr': 'en'},
  defaultLocale: 'fr'

});

app.use(i18n.init);

/*
* Implantation de express mailler
*/

expressMail.extend(app, {
  host:'smtp.gmail.com',
  secureConnection: true,
  port: 465,
  transportMethod: 'SMTP',
  auth: {
    user: 'kamitbrains@gmail.com',
    pass: 'Aurelio_81g_n3aa_1993'
  }
});




app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/locale/:locale', function(request, response) {
  
  i18n.setLocale(request.params.locale); 
  response.back();
});


app.post('/sendmail', function(request, response) {
  

  var datas = request.body;

  if(_.isEmpty(datas.name) || _.isEmpty(datas.email) || _.isEmpty(datas.subject) || _.isEmpty(datas.message)){
    response.json({status : false, text:'<h4>'+__('Contact Validation Failed')+'</h4>'});
  }else{

    //console.log(datas);

    // Setup email data. 
    var fromvaleur = `${datas.name} <${datas.email}>`;
    var mailOptions = {
      from: fromvaleur,
      subject: datas.subject,
      cc: 'nkaurelien@gmail.com,igornathan777@gmail.com,ngwenidriss@gmail.com',
      locals: {
        message: datas.message
      }
    };
    
    // Send email. 
    app.mailer.send('email/contact.ejs', mailOptions, function (error, res) {
      if (error) {
        console.log(error);
        response.json({status : false, text:'<h4>'+i18n.__('Error')+'</h4>'});
      } else {
        console.log('Message sent: ' + res.message);
        response.json({status : true, text:'<h4>Votre message a ete envoyer corretement</h4>'});
        
      }
    }); 

  }

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


