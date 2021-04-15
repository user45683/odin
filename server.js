const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  /*socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });*/
  socket.on('private message', (socketId, msg) =>{
  io.broadcast.to(socketId).emit('message', socket.id, msg);
  });
  console.log(socket.id);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
