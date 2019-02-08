const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  // socket.emit('newEmail', {//this is sending newEmail to clientside socket.on('', )
  //   from:'somai@gmail.com',
  //   text:'hey, i am from server',
  //   createdAt: 123
  // });
  // socket.on('createEmail', (newEmail) => { //Its listening to clientside for createEmail
  //  console.log('createEmail', newEmail);
  // });
  socket.on('createMessage', (message) => {
    console.log('createMessage:', message);
    io.emit('newMessage', {
      from: message.from,
      to:message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('user Disconnected');
  });
});
server.listen(port, () => {
  console.log(`server started in ${port}`);
});
