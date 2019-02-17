const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/user');


const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

socket.emit('newMessage', generateMessage('admin','Welcome to the chat app' ));

socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

socket.on('join', (params, callback) => {
   if (!isRealString(params.name) || !isRealString(params.room)) {
    return callback('Name and room names are required');
   }

   socket.join(params.room);
   users.removeUser(socket.id);
   users.addUser(socket.id,params.name, params.room);

   io.to(params.room).emit('updateUserList', users.getUserList(params.room));//this users.getUserList return namesArra so there only users name not a object.

   socket.emit('newMessage', generateMessage('admin','Welcome to the chat app' ));
   socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
   callback();
});

socket.on('createMessage',(message, callback) => {
  let user = users.getUser(socket.id);

  if (user && isRealString(message.text)) {
    io.to(user[0].room).emit('newMessage', generateMessage(`${user[0].name}`, `${message.text}`));
  }
    callback();//this callback is for acknowledgement
});

socket.on('createLocationMessage', (coords) => {
  let user = users.getUser(socket.id);
  if(user) {
     io.to(user[0].room).emit('newLocationMessage', generateLocationMessage(user[0].name, coords.latitude, coords.longitude));
  }

});

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
       io.to(user.room).emit('updateUserList', users.getUserList(user.room));
       io.to(user.room).emit('newMessage',generateMessage('Admin', `${user.name} has left room`));

    }
    console.log('user Disconnected');
  });
  });
server.listen(port, () => {
  console.log(`server started in ${port}`);
});
