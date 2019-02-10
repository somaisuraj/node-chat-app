const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

socket.emit('newMessage', generateMessage('admin','Welcome to the chat app' ));

socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

socket.on('createMessage',(message, callback) => {
   console.log('createMessage', message);
   io.emit('newMessage', generateMessage(`${message.from}`, `${message.text}`));
   callback();//this callback is for acknowledgement
});

socket.on('createLocationMessage', (coords) => {
  io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
});

  socket.on('disconnect', () => {
    console.log('user Disconnected');
  });
  });
server.listen(port, () => {
  console.log(`server started in ${port}`);
});
