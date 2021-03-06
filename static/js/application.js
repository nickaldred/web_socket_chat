// Support TLS-specific URLs, when appropriate.
if (window.location.protocol == "https:") {
  var ws_scheme = "wss://";
} else {
  var ws_scheme = "ws://"
};

var inbox = new ReconnectingWebSocket(ws_scheme + location.host + "/receive");
var outbox = new ReconnectingWebSocket(ws_scheme + location.host + "/submit");

inbox.onmessage = function(message) {
  var data = JSON.parse(message.data);
  $("#chat-text").append("<div class='panel panel-default'><div class='panel-heading'>" + $('<span/>').text(data.handle).html() + "</div><div class='panel-body'>" + $('<span/>').text(data.text).html() + "</div></div>");
  $("#chat-text").stop().animate({
  scrollTop: $('#chat-text')[0].scrollHeight
  }, 800);
};

inbox.onclose = function(){
  console.log('inbox closed');
  this.inbox = new WebSocket(inbox.url);

};

outbox.onclose = function(){
  console.log('outbox closed');
  this.outbox = new WebSocket(outbox.url);
};

$("#input-form").on("submit", function(event) {
  event.preventDefault();
  var handle = $("#input-handle")[0].value;
  var text   = $("#input-text")[0].value;
  input_validation(JSON.stringify(handle), JSON.stringify(text))
  console.log(JSON.stringify({ handle: handle, text: text }))
  outbox.send(JSON.stringify({ handle: handle, text: text }));
  console.log("button sending " + JSON.stringify({ handle: handle, text: text }))
  $("#input-text")[0].value = "";
});


//Checks the input handle and text for SQL injection

function input_validation(handle, text) {
  if (handle.includes("SELECT") || handle.includes("UPDATE")|| handle.includes("DELETE") || handle.includes("INSERT INTO") || handle.includes("CREATE DATABASE") || handle.includes("ALTER DATABASE") || handle.includes("CREATE TABLE") || handle.includes("ALTER TABLE") || handle.includes("DROP TABLE") || handle.includes("CREATE INDEX") || handle.includes("DROP INDEX")) {   
    const myElement = document.getElementById("error");
    myElement.style.display = "block";
    myElement.textContent = 'Attempted SQL injection! Leave Now!';
    throw 'Attempted SQL injection! Leave Now!'

  }

  else if (text.includes("SELECT") || text.includes("UPDATE")|| text.includes("DELETE") || text.includes("INSERT INTO") || text.includes("CREATE DATABASE") || text.includes("ALTER DATABASE") || text.includes("CREATE TABLE") || text.includes("ALTER TABLE") || text.includes("DROP TABLE") || text.includes("CREATE INDEX") || text.includes("DROP INDEX")) {
    const myElement = document.getElementById("error");
    myElement.style.display = "block";
    myElement.textContent = 'Attempted SQL injection! Leave Now!';
    throw 'Attempted SQL injection! Leave Now!' 

  }

}