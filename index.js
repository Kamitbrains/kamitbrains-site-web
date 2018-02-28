var express = require('express');
var diskdb = require('diskdb');var expressMail = require('express-mail');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


db = diskdb.connect('datastorage', ['equipes']);


app.get('/', function(request, response) {
  response.render('pages/index');
});


app.post('/sendmail', function(request, response) {
  
  // expressMail.extend(app, {
  //   transport: 'SMTP',
  //   config: {
  //     service: 'Gmail',
  //     auth: {
  //       user: 'kamitbrains@gmail.com',
  //       pass: 'Aurelio_81g_n3aa_1993'
  //     }
  //   },
  //   defaults: {
  //     from: 'kamitbrains@gmail.com'
  //   }
  // });

  // // Setup email data. 
  // var mailOptions = {
  //   to: 'bar@blurdybloop.com',
  //   subject: 'Contact from Kamitbrains website ✔',
  //   locals: {
  //     title: 'Hello Admin',
  //     message: 'Welcome to my website'
  //   }
  // }
  
  // // Send email. 
  // app.send('mail', mailOptions, function (error, response) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Message sent: ' + response.message);
  //   }
  // });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


