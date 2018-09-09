//import app.js pada folder controller 
var app = require('./controller/app.js');

// Instansiasi server dengan app.listen untuk koneksi ke port 8081
var server = app.listen(8081, function (){
	var port = server.address().port;
	console.log('Web App Hosted at http://localhost:%s', port);
	
});
