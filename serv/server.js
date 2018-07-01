var express = require('express')
var cors = require('cors')
var app = express()
var itemService = require('./service/item.js');
var orderService = require('./service/order.js');
var userService = require('./service/user.js');
var bodyParser = require('body-parser')

app.use(cors())

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(jsonParser);

// POST /api/login gets urlencoded bodies
app.post('/api/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body)
  // res.send('welcome, ' + req.body.username)
  userService.singinuser(req.body, function(data){
    res.json(data);
  });
})

// POST /api/order/create a orders
app.post('/api/order/create', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body)
  // res.send('welcome, ' + req.body.username)
  orderService.addNewOrder(req.body.user, req.body.items, function(data){
    res.json(data);
  });
})

// POST /api/order/update an order
app.post('/api/order/update', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body)
  // res.send('welcome, ' + req.body.username)
  orderService.updateOrder(req.body, function(data){
    res.json(data);
  });
})

//GET /api/orders
app.get('/api/orders', function (req, res, next) {
  orderService.getAllOrders(function(orders){
    res.json(orders);
  });
})

//GET /api/order/csv
app.get('/api/order/csv', function (req, res, next) {
  orderService.getOrderedItemsCSV(function(csv){
    res.setHeader('Content-disposition', 'attachment; filename=orders.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  });
})

// get /api/user/:id gets urlencoded bodies
app.get('/api/user/:userId', urlencodedParser, function (req, res) {
  if (!req.params) return res.sendStatus(400)
  console.log(req.params)
  if(req.params.userId){
    // res.send('welcome, ' + req.body.username)
    userService.getUserById(req.params.userId, function(data){
      res.json(data);
    });

  }else{
    res.json([]);
  }

})


app.get('/api/item', function (req, res, next) {
  itemService.getAvailableItems(function(items){
    res.json(items);
  });
})


app.listen(3300, function () {
  console.log('CORS-enabled web server listening on port 3300')
})
