const express = require('express');
const data = require('./data');
const bodyParser = require('body-parser');
HOST = "localhost";

// Initialize App
const app = express();
//const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

/*app.configure(function(){
  app.use(express.bodyParser());
});

 */
var nodemailer = require('nodemailer');
const {hostname} = require("os");

app.use(express.json());
//email initialize

//Use this one!
app.get('/filter/:filter_1/:filter_2/:filter_3/:filter_4/', (req, res, next) => {

const filters = [req.params['filter_1'],req.params['filter_2'],req.params['filter_3'],req.params['filter_4']];

  const filteredUsers = data.filter(user => {
    let isValid = false;
    for (key in filters) {
      //console.log(key, user[key], filters[key]);



      for (var i = 0; i < 4; i++) {
        console.log(key, user["tags"][i], filters[key]);
        if (filters[key] == user["tags"][i]) {
          isValid = true;
          console.log("true");
        } else {
          //isValid = false;
        }
      }
      }

    return isValid;
  });
  res.send(filteredUsers);
});

app.use('/search/', (req, res, next) => {
  const filters = req.query;
  const filteredUsers = data.filter(user => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key].includes(filters[key]);
    }
    return isValid;
  });
  res.send(filteredUsers);
});


// Assign route
//One filter
app.use('/filter2/', (req, res, next) => {
  const filters = req.query;



  const filteredUsers = data.filter(user => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredUsers);
});

//Multiple filters but one key
app.use('/filter-old/', (req, res, next) => {
  const filters = req.query;
  const filteredUsers = data.filter(user => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      for (var i = 0; i < 4; i++) {
        if (user[key].indexOf(filters[key]) > -1) {
          isValid = true;
        } else {
          isValid = false;
        }
      }


    }
    return isValid;

  });
  res.send(filteredUsers);
});


//Multiple filters and Multiple keys
app.use('/filter/', (req, res, next) => {
  const filters = req.query;
  const filteredUsers = data.filter(user => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      for (var i = 0; i < 4; i++) {
        if (user[key].indexOf(filters[key]) > -1) {
          isValid = true;
        } else {
          isValid = false;
        }
      }


    }
    return isValid;

  });
  res.send(filteredUsers);
});

app.use('/searchOld/', (req, res, next) => {
  const filters = req.query;
  const filteredUsers = data.filter(user => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key].includes(filters[key]);
    }
    return isValid;
  });
  res.send(filteredUsers);
});

//mailer route

app.post('/api/email/',  (req, res) => {

  //const filters = req.query;
  //https://masteringjs.io/tutorials/express/post
  req.body;
  res.json(req.body);



  const {name_var, feedback_var} = req.body

 // let testvar = req.body.name_var



  console.log(name_var, " name_var")
      // console.log(testvar, " test_var");
//console.log(req.query,"reqeuery");
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'paul.eroy.swan@gmail.com',
      pass: 'uzpkrcggfcqvppfi'
    }
  });
  //https://stackoverflow.com/questions/58653990/how-change-the-sender-name-of-a-mail-with-nodemailer
  let from = `PortfolioMessenger <paul.eroy.swan@gmail.com>`
  var mailOptions = {
    from: from,
    to: 'peswan@live.com',
    subject: 'New feedback about your Portfolio',
    html: '<h1>Thank You for sending feedback about my Portfolio</h1>' +
        '<p>We will take your feedback in to consideration.</p>' +
        feedback_var+ '<br><small>This is an automatic email</small>',
    context: {
      feedback_var,
    },
  };
//https://www.w3schools.com/nodejs/nodejs_email.asp
//https://stackoverflow.com/questions/53496562/sending-html-template-through-mail-using-node-js-node-mailer

  var mailOptions_2 = {
    from: from,
    to: name_var,
    subject: 'Thank You for sending feedback about my Portfolio',
    html: '<h1>We will take your feedback in to consideration</h1>' +
        feedback_var+ '<br><small>This is an automatic email</small>',
    context: {
    feedback_var, name_var,
  },
  };



  setTimeout(             //Set a time out period to allow the data to insert into users
      () => {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      console.log('Got body2: ', req.body);
      res.sendStatus(200);
    }
  });

    },
    500 // the time to sleep to delay for
);
  transporter.sendMail(mailOptions_2, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent_2: ' + info.response);
    }
  });

  //res.send(req.body);


});

//use .get


// Start server on PORT 5000
//paulswan.dev for hostname
app.listen(5000,HOST,() => {
  console.log('Server started!',HOST);
});
