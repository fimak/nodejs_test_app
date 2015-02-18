var express = require('express'),
	app = express(),
	server,
	store = {
		home: {
			page: "Main page",
			content: "Node.js is my new stuff!"
		},
		about: {
			page: "About page",
			content: "My first project powered by node.js and express"
		},
		profile: {
			page: "Profile page",
			content: "My name is Aleksander Ufimtsev.\nI am full stack web developer from Russia."
		}
	}

app.disable('x-powered-by');
app.set('view engine', 'jade');
//example of set callback
app.use(function(req, res, next){
	console.log('%s %s', req.method, req.url);
	next();
});
//static content
app.use(express.static(__dirname + '/public'));
//render template with some data
app.get('/:page?', function(req, res){
	var page = req.params.page, data;
	if (!page) page = 'home';
	data = store[page];
	if (!data) return res.redirect('/');
	data.links = Object.keys(store);
	res.render('main', data);
});
//start server and listen port 3000
server = app.listen(3000, function(){
	console.log('Listening on port 3000');
});