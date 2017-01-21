var url = require('url');
var http = require('http');
var request = require("request");


http.createServer(function(req, res) {
  var options = url.parse(req.url, true);
  var path = "http://" + options.query.fpath;
  request(path).pipe(res);
}).listen(process.env.PORT || 3080);

console.log("proxy server started");
