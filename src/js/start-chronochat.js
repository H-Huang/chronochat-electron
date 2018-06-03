var chronoChat;
var microForwarderTransport;
var TRANSITION_TIME = 500;

$(document).ready(function () {
  $("#chatBox").hide();
  $("#microForwarderLabel").hide();
  $("#microForwarder").hide();
  $('#connectionBox').hide().fadeIn(TRANSITION_TIME);
  microForwarderTransport = new MicroForwarderTransport();
  microForwarderTransport.setOnReceivedObject(function (obj) {
    var haveMicroForwarder = (obj.type == "faces/list");
    if (haveMicroForwarder) {
      $("#microForwarderLabel").show();
      $("#microForwarder").show();
    }
  });
  // Check if the Micro Forwarder is enabled.
  setTimeout(function () {
    microForwarderTransport.sendObject({
      type: "faces/list"
    });
  }, 500);

  //Stop click event
  $('.btn').click(function (event) {
    event.preventDefault();
  });

  $("#connect").click(function () {
    var screenName = $('#name').val()
    var chatroom = $('#chatroom').val();
    var hubPrefix = $('#hubPrefix').val();
    var hostName = $('#hub').val();

    if (screenName == "") {
      $("#errorMessage").text("name must be nonempty");
      $("#errorMessage").show();
      return;
    } else {
      $("#errorMessage").hide();
    }

    var face
    if ($('input[name="face"]:checked').val() === "microForwarder")
      face = new Face(microForwarderTransport, new MicroForwarderTransport.ConnectionInfo());
    else
      face = new Face({
        host: hostName
      });

    var identityStorage = new MemoryIdentityStorage();
    var privateKeyStorage = new MemoryPrivateKeyStorage();
    var keyChain = new KeyChain(new IdentityManager(identityStorage, privateKeyStorage), new SelfVerifyPolicyManager(identityStorage));

    var keyName = new Name("/testname/DSK-123");
    var certificateName = keyName.getSubName(0, keyName.size() - 1).append("KEY").append(keyName.get(-1)).append("ID-CERT").append("0");
    identityStorage.addKey(keyName, KeyType.RSA, new Blob(DEFAULT_RSA_PUBLIC_KEY_DER, false));
    privateKeyStorage.setKeyPairForKeyName(keyName, KeyType.RSA, DEFAULT_RSA_PUBLIC_KEY_DER, DEFAULT_RSA_PRIVATE_KEY_DER);

    face.setCommandSigningInfo(keyChain, certificateName);

    // fade out connection screen and background
    $("#connectionBox").fadeOut(TRANSITION_TIME);
    $("#wrapper").animate({"background-color": "rgb(171, 210, 255)"}, TRANSITION_TIME);
    $("#chat").show();

    $("#roomInfo").append($("<span>").html("ChronoChat : " + chatroom));
    // document.getElementById('room').innerHTML = '<grey>Chatroom: </grey>' + '<b><green>' + chatroom +
    //   '</green></b>';
    // document.getElementById('room').innerHTML += '<grey>  Username: </grey>' + '<b><green>' + screenName +
    //   '</green></b>';
    // document.getElementById('menu').innerHTML = '<p><b>Member</b></p>';

    chronoChat = new ChronoChat(screenName, chatroom, hubPrefix, face, keyChain, certificateName);
    $("#chatBox").fadeIn(TRANSITION_TIME);
  });
});

// Enable sending the message by pressing 'Enter'.
function checkKey(event) {
  if (event.keyCode == 13)
    chronoChat.sendMessage();
}