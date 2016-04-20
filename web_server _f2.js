var http = require('http'), 
    fs = require('fs');

var server = http.createServer();

fs.readFile('./frame2.htm', function(err, html) {
    if(err) {
        throw err;
    }
    http.createServer(function(req, res) {
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    }).listen(8086);
});


