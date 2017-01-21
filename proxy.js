/*
var url = require('url');
var http = require('http');
var request = require("request");


http.createServer(function(req, res) {
  var options = url.parse(req.url, true);
  request(options.query.fpath).pipe(res);
}).listen(process.env.PORT || 3080);

console.log("proxy server started");
*/



var url = require('url');
var http = require('http');
var acceptor = http.createServer().listen(process.env.PORT || 3080);

acceptor.on('request', function(request, response) {
  console.log('request ' + request.url);
  request.pause();
  var options = url.parse(request.url, true);
  options.headers = request.headers;
  options.method = request.method;
  options.agent = false;
  options.hostname = options.query.fpath;

  console.log("+++++options" + options);

  var connector = http.request(options, function(serverResponse) {
    serverResponse.pause();
    response.writeHeader(serverResponse.statusCode, serverResponse.headers);
    serverResponse.pipe(response);
    serverResponse.resume();
  });
  request.pipe(connector);
  request.resume();
});
