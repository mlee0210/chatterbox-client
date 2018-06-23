// YOUR CODE HERE:
// $(document).ready(function() {
//code to connect to server
const App = function () {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
};

App.prototype.init = function () {
  
};

App.prototype.send = function (message) {
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    },
  });
};

App.prototype.fetch = function () {
  // get newest messages not oldest
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    // do we need to define the data for a get request
    // data: JSON.stringify(message)
    success: function (data) {
      console.log('chatterbox: Message received');
      // for (let val of data.results) {
      //   if (val.text.indexOf('script') < 0) {
      //     $(val).appendTo('#chats');
      //   }
      // }
      // console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });
};

App.prototype.clearMessages = function () {
  $('#chats').empty();
};

App.prototype.renderMessage = function (message) {
//   // block these &, <, >, ", ', `, , !, @, $, %, (, ), =, +, {, }, [, and ]
  if ($('#roomSelect option[value=' + message.roomname + ']') !== message.roomname) {
    $('#roomSelect').append('<option value=\"' + message.roomname + '\">' + message.roomname + '</option>');
  } 
  $('#chats').prepend('<div><h1>' + message.username + '</h1><p>' + message.text + '</p></div>');
};

App.prototype.renderRoom = function () {
  // $('#chats').append('<div id=' + roomName + '></div>');
  // $('#roomSelect').append('<a href=\"#\" id=\"roomName\">' + roomName + '</a>');
  var selectedRoom = $("#roomSelect option:selected").val();
  console.log(selectedRoom);
  // iterate through all messages and only show messages with matching selected room
  // var all = document.getElementsByTagName("*");

  // for (var i=0, max=all.length; i < max; i++) {
  //   if (i !== selectedRoom) {
  //     hide
  //   }
  // }
};

// function (message) {
//     $(message).appendTo('#chats'); 
// })

const newMessage = function (username, text, roomname) {
  this.username = username;
  this.text = text;
  this.roomname = roomname;
};

let app = new App();
let message1 = new newMessage('David', 'Hi', 'sfm8');
let message2 = new newMessage('Michael', 'Hi', 'sfm9');

// app.send(message);
app.renderMessage(message1);
app.renderMessage(message2);
app.renderRoom();
// app.fetch();
// });



// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };