// YOUR CODE HERE:
// $(document).ready(function() {
//code to connect to server
const App = function () {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  this.APIParam = {order: '-createdAt'};
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
    data: this.APIParam,
    type: 'GET',
    success: function (data) {
      console.log('chatterbox: Message received');
      let cleanObj = {};
      for (let val of data.results) {
        // let newString = '';
        // change < into &lt and > into &gt
        // console.log('object: ' + Object.keys(val));
        // debugger;
        for (let key in val) {
          if (key !== 'createdAt' && key !== 'objectId' && key !== 'updatedAt') {
            cleanObj[key] = escapeChar(val[key]);
          } else {
            cleanObj[key] = val[key];
          }
        }
        // send newString to renderMessages
        app.renderMessage(cleanObj);
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });
};

const escapeChar = function (string) {
  let badChar = {'\&':'&amp', '\<':'&lt', '\>':'&gt', '\"':'&quot', '\'':'&apos', '\`':'&grave', '\,':'&comma', '\!':'&excl', '\@':'&commat', '\$':'&dollar', '\%':'&percnt', '\(':'&lpar', '\)':'&rpar', '\=':'&equals', '\+':'&plus', '\{':'&lbrace', '\}':'&rbrace', '\[':'&lbrack', '\]':'&rbrack'};
  let cleanString = ''
  if (!string) {
    cleanString = 'null';
    return cleanString;
  }
  for (let char of string) {
    if (badChar.hasOwnProperty(char)) {
      cleanString += badChar[char];
    } else {
      cleanString += char;
    }
  }
  return cleanString;
}


App.prototype.clearMessages = function () {
  $('#chats').empty();
};

App.prototype.renderMessage = function (message) {
  if (!$('#roomSelect').find('*').is(`option[value='${message.roomname}']`)) {
    $('#roomSelect').append(`<option value='${message.roomname}'>${message.roomname}</option>`);
  }
  $('#chats').append(`<div id=message class='${message.roomname}'><h1 class=username id=${message.username}>${message.username}</h1><h3>${message.createdAt}</h3><p>${message.text}</p></div>`);
};

App.prototype.renderRoom = function () {
  // debugger;
  $('#chats').find('*').toggle(false);
  var selectedRoom = $('#roomSelect option:selected').val();
  
  if (selectedRoom !== 'Rooms:') {
    console.log(selectedRoom);  
    $('#chats').find(`.${selectedRoom}`).find('*').toggle();
    $('#chats').find(`.${selectedRoom}`).toggle();
  }
};

App.prototype.handleUsernameClick = function(chats, username) {
  // console.log(username);
  // console.log($('chats'));
  let clickedUser = username.attr('id') 
  $('#chats').find(`#${clickedUser}`).css('color', 'blue');
  $('#friends').append(`<div>${clickedUser}</div>`)
};

App.prototype.handleSubmit = function () {
  let newObj = {}
  newObj.username = document.getElementById('inputUsername').value;
  // newObj.username = inputUsername;
  newObj.text = document.getElementById('inputText').value;
  // newObj.username = inputText;
  newObj.roomname = document.getElementById('inputRoom').value
  // newObj.username = inputRoom;
  console.log(newObj);
  app.send(newObj);  
};


const newMessage = function (username, text, roomname) {
  this.username = username;
  this.text = text;
  this.roomname = roomname;
};

let app = new App();
app.fetch();

$('select').on('change', function() {
  app.renderRoom();
});

$(document).on('click', '.username', function() {
  console.log('here');
  app.handleUsernameClick($('#chats'), $(this));
});


$(document).on('click', '.submit', function() {
  // console.log(document.getElementById('inputUsername').value);
  app.handleSubmit();
});
// });
