var express = require('express');
var ejs = require('ejs');
var _ = require('underscore');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

var url = 'mongodb://localhost:27017/myBlog';

app.get('/', function(req, res){

	MongoClient.connect(url, function(err, db) {
		console.log("Connected correctly to server");
		db.collection('posts')
		.find()
		.toArray(function(err, docs){
			if (err) {
				return console.log('Error', err);
			}
			db.close();
			res.render('homePage.ejs', {
				documents: 	docs
			})
		})
	})
})


app.get('/posts/:id', function(req, res){
	MongoClient.connect(url, function(err, db){
		console.log("Connected correctly to server", req.params.id);
		db.collection('posts')
		.find({_id: new mongo.ObjectID(req.params.id)})
		.toArray(function(err, doc){
			if (err) {
				db.close();
				return console.log("Error", err);
			}
			console.log(doc, req.params.id);
			res.render('post.ejs', {
				post: doc[0],
				date: new Date(doc[0].date)

			})
		})
	})
})


				//Server listening\\

app.listen(3033, function() {
	console.log('Server is listenin on port 3033!');
});