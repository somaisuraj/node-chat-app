let socket = io();
socket.on('connect', function () {
  console.log('connected to server');


  socket.on('newMessage', function(message) {
    console.log('This only socket for newmessage:', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
  });
  });

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'Hunter',
    text: $('[name=message]').val()
  }, function () {

  });
});
