var http = require('http'), 
    fs = require('fs');

var server = http.createServer();


fs.readFile('./index.htm', function(err, html) {
    if(err) {
        throw err;
    }
    fs.readFile('./style.css', "");
    fs.readFile('./iframe.htm', "");
    http.createServer(function(req, res) {
        res.writeHeader(200, {"Content-Type": "text/html", });
        res.write(html);
        res.end();
    }).listen(8084);
});


