// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api', (req, res)=>{
  console.log('hola');
  unix = Date.now().valueOf();
  utc = Date.now().toUTCString();
  console.log('hola2');
  let json = {unix: unix, utc: utc};

  res.json(json);
});


app.get("/api/:date", (req, res)=>{
  let date;
  let unix;
  let utc;
  let dateObject;
  console.log('hola3');
  if (!req.params || !req.params.date){
    console.log('noparams');
    dateObject = Date.now();
  }else{
    date = req.params.date;
    let isnum = /^\d+$/.test(date);
    if (isnum){
      date = parseInt(date);
    }
    dateObject = new Date(date);
  }
  console.log('hola4');
  if (!isValidDate(dateObject)) res.json({ error : "Invalid Date" });
  
  unix = dateObject.valueOf();
  utc = dateObject.toUTCString();
  let json = {unix: unix, utc: utc};

  res.json(json);
});

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
