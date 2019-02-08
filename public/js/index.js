let socket = io();
socket.on('connect', function () {
  console.log('connected to server');

  // socket.emit('createEmail', { //this means it is emiting or sending data to the server
  //   to:'somai@surajjjj.con',
  //   text:'this id from clientside'
  // });

  socket.on('newMessage', function(newMsg) {
    console.log('newMessage:', newMsg);
  });

  socket.emit('createMessage', {
    from:'client@side.com',
    text:'this is new message from clientside'
  });
});
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {//email gets its value because server is emiting with newEmail and {}
//  console.log('new email', email);
// });
