var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000
app.listen(port, function() {console.log('Running on port '+port+'.')});

app.use(express.static('./client'));
app.use(express.static('./bower_components'));

var fs = require('fs');
var writeStream = fs.createWriteStream('file.xls');

var rows = [];
var row1 = [];
row1.push('A','2');
rows.push(row1);
var rows2 = [];
rows.push(rows2);
rows2.push('=5*B1');

var result = rows.map(function(r){return r.join('\t')});
// var result = rows.map(function(r){return r.join('\t')}).join('\n');
// var row2 = "5" + "\t" + "B" + "\n";
// var row3 = "A2 + B1";

writeStream.write(result[0]+'\n');
writeStream.write(result[1],function() {

	writeStream.close();
});
// writeStream.write(row2);
// writeStream.write(row3);

