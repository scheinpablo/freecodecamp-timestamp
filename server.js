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

app.get("/api/:date", (req, res)=>{
  
  let date = req.params.date;
  let unix;
  let utc;
  let dateObject;

  if (date == null || date == ''){
    dateObject = Date.now();
    dateObject.setMinutes(dateObject.getMinutes()-3);
  }else{
    let isnum = /^\d+$/.test(date);
    if (isnum){
      date = parseInt(date);
    }
    dateObject = new Date(date);
  }



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
