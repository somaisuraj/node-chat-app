let socket = io();
socket.on('connect', function () {
  console.log('connected to server');


  socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('This only socket for newmessage:', message);
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    $('#messages').append(li);
  });
  });

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = $('<li></li>');
  let a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from} ${formattedTime}`);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
 var messageTextBox = $('[name=message]');

$('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'Hunter',
    text: messageTextBox.val()
  }, function () {
   messageTextBox.val('');
  });
});
 let locationButton = $('#send-location');
 locationButton.on('click', function () {
    if(!navigator.geolocation) {//this is core js library so require is not needed
        return alert('geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('sending location..')
    //this below function is already in browser so we can access directly
    navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('send location');
       socket.emit('createLocationMessage', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
       });
    }, function () {
      locationButton.removeAttr('disabled').text('send location');
      alert('Unable to fetch location');
    });
 });
