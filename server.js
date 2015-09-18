var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000
app.listen(port, function() {console.log('Running on port '+port+'.')});

app.use(express.static('./client'));
app.use(express.static('./bower_components'));
