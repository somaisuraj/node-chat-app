let socket = io();

function scrollToBottom () {
   var messages = $('#messages');
   var newMessage = messages.children('li:last-child');
   var clientHeight = messages.prop('clientHeight');
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();


   if (clientHeight + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
   }
}
socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (error) {
    if (error) {
      alert(error);
      window.location.href = '/';
    } else {
      console.log('no error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = $('<ol></ol>');

  users.forEach(function (user) {
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime});

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
var formattedTime = moment(message.createdAt).format('h:mm a');
var template = $('#location-message-template').html();
var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
});
$('#messages').append(html);
scrollToBottom();
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
