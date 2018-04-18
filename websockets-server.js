var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];

console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("client connection established");

  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on("message", function(data) {
    console.log("message received: " + data);

    //check if message was a command
    var data_words = data.split(" ");
    var command = data_words.splice(0, 1);
    if (command == "/topic") {
      console.log("topic command found");

      var topic = "'" + data_words.join(" ") + "'";
      data = "*** Topic has changed to " + topic;
      messages.push("*** Topic is " + topic); //This is what new users will see
    } else {
      messages.push(data);
    }

    //broadcast to all clients
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data);
    });
  });
});
