var express = require('express')
var cors = require('cors')
var app = express()
var itemService = require('./service/item.js');
var userService = require('./service/user.js');
var bodyParser = require('body-parser')

app.use(cors())

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(jsonParser);

// POST /login gets urlencoded bodies
app.post('/api/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body)
  // res.send('welcome, ' + req.body.username)
  userService.singinuser(req.body, function(data){
    res.json(data);
  });
})


app.get('/api/item', function (req, res, next) {
  itemService.getAvailableItems(function(items){
    res.json(items);
  });
})

app.listen(3300, function () {
  console.log('CORS-enabled web server listening on port 3300')
})
