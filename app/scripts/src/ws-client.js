let socket; // using "let" instead of "var" prevents hoisting issue

function init(url) {
  socket = new WebSocket(url);
  console.log("connecting...");
}


function registerOpenHandler(handlerFunction) {
  socket.onopen = () => { // "=>" means this is an anonymous function
    console.log("open");
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = (e) => {
    console.log("message", e.data);
    let data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
};
