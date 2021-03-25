Lecture here: https://youtu.be/wYNIiiqYu7w

Backend here: https://github.com/NickyEXE/hackerchat-backend

const socket = new WebSocket("ws://localhost:3000/cable")
let message =  {"command": "subscribe", "identifier": "{\"channel\": \"ChannelChannel\", \"id\": \"1\"}"}
socket.onopen = function(event){
  console.log("open", message)
  socket.send(JSON.stringify(message))
  socket.onmessage = function(event){
    console.log("message", event)
  }
}


<!-- socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
}); -->
