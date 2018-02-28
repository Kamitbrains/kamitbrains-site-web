var express = require('express');
var diskdb = require('diskdb');
var qs = require('qs');
var bodyParser = require('body-parser');
var expressMail = require('express-mailer');
var app = express();


db = diskdb.connect('datastorage', ['equipes']);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


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


app.post('/sendmail', function(request, response) {
  

  var datas = request.body;


  console.log(datas);

  // Setup email data. 
  var fromvaleur = `${datas.name} <${datas.email}>`;
  var mailOptions = {
    from: fromvaleur,
    subject: datas.subject,
    cc: 'nkaurelien@gmail.com,igornathan777@gmail.com,ngwenidriss@gmail.com',
    locals: {
      title: 'Hello Admin',
      message: datas.message
    }
  }
  
  // Send email. 
  app.mailer.send('email/contact.ejs', mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: ' + response.message);
    }
  });



});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


