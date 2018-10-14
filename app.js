//loading the express module
var express = require('express');
var app = express();
//loading the Controllers
var todoC = require('./controllers/todoController');

//set up the view engine
app.set('view engine', 'ejs');

//set up the static files.
app.use(express.static('./public'));

//Calling the controller
todoC(app);

//listen to a port
app.listen(3000);
console.log('Service running at port: 3000');