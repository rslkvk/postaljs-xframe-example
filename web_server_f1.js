var http = require('http'), 
    fs = require('fs');

var server = http.createServer();

fs.readFile('./frame1.htm', function(err, html) {
    if(err) {
        throw err;
    }
    http.createServer(function(req, res) {
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    }).listen(8085);
});


