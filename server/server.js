const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

socket.emit('adminMessage', generateMessage('admin','Welcome to the chat app' ));

socket.on('new user',(message) => {
   console.log('newUser', message);
   socket.broadcast.emit('broadcast', generateMessage('admin', `${message.from} joined`));
});

  // socket.on('createMessage', (message) => {// data is emiting from console.log
  //   console.log('createMessage console:', message);
  //   io.emit('newMessage', {
  //     from: message.from,
  //     to:message.text,
  //     createdAt: new Date().getTime()
  //   });
  //   socket.broadcast.emit('newMessage', {//broadcast will not show the deatils of emitter ones
  //     from: message.from,
  //     text: message.text,
  //     createdAt: new Date().getTime()
  //   });


  socket.on('disconnect', () => {
    console.log('user Disconnected');
  });
  });
server.listen(port, () => {
  console.log(`server started in ${port}`);
});
