var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var path = require("path");
var mime = require("mime");
require("./websockets-server"); //not using this yet, but we still want to run it

var server = http.createServer(function(req, res) {
  console.log("Responding to a request.");

  var filePath = extract(req.url);
  var fileExt = filePath.split(".").pop();

  fs.readFile(filePath, function(err, data) {
    if (err) {
      filePath = path.resolve(__dirname, "app", "error.html");
      fs.readFile(filePath, function(err, data) {
        res.end(data);
      });
      return;
    } else {
      res.setHeader("Content-Type", mime.getType(fileExt));
      res.end(data);
    }
  });
});
server.listen(3000);
