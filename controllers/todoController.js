var bodyParser = require('body-parser');

//Adding the Mongoose Module
var mongo = require('mongoose');

//Connect to the MongoDB Database.
mongo.connect('mongodb://tarek:tarek123@ds125273.mlab.com:25273/nodejs');

//Create a Schema
var todoSchema = new mongo.Schema({
    item: String
});

var TodoM = mongo.model('TodoM', todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function(app){
    //Handling the get request
    app.get('/todo', function(req, res){
        //Get data from MongoDB.
        TodoM.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {vars: data});
        });
    });

    //Handling the post request
    app.post('/todo', urlencodedParser, function(req, res){
        var newTodo = TodoM(req.body).save(function(err, data){
            if(err) console.log(err); //throw err;
            res.json(data);
        });
        // if(req.body){
        //     data.push(req.body);
        // }
        // res.render('todo', {vars: data});
    });

    //Handling the delete request
    app.delete('/todo/:item', urlencodedParser, function(req, res){
        TodoM.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.render('todo', {vars: data});
    });
};