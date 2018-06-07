function fieldFocus(field, value) {
    if (field.value == value) {
        field.value = '';
        $(field).css("color", "#000");
    }
}

function fieldBlur(field, value) {
    if (field.value == '') {
        field.value = value;
        $(field).css("color", "#AAA");
    }
}

function clearMembershipList() {
    $("#memberList").html("");
}

function addMemberToMembershipList(name){
    $("#memberList").append($("<li>").text(name));
}

function getMessage() {
    return $("#messageInput").val().trim();
}

function clearMessageInput() {
    $("#messageInput").val("");
}

// TODO
function leaveChatText() {

}

function leaveChat() {  
    $("#chatActionsText").text("Leaving chat in 3...");
    setTimeout(function() { $("#chatActionsText").text("Leaving chat in 2..."); }, 1000);
    setTimeout(function() { $("#chatActionsText").text("Leaving chat in 1..."); }, 2000);
    setTimeout(function() { $("#chatActionsText").text(""); }, 3000);
    setTimeout(function() { location.reload(); }, 3000);
}

function joinedChatText(name, chatroom, time) {
    $("#txt").append($("<div class='chatBoxMessage'>")
        .append($("<p class='joinedChatText'>")
        .append($("<b>").text(name + " joined " + chatroom + " at " + time))));
}

function chatText(name, time, message, ownName) {
    strippedName = name.replace(/\s/g,'');
    // if class before does not have same name, add name
    if (name == ownName) {
        if (!$("#txt").children().last().children().eq(0).hasClass(strippedName)){
            $("#txt").append($("<div class='chatBoxMessage'>")
                .append($("<p class='messageInfo ownMessageInfo " + strippedName + "'>").text(name)));
        }
    } else {
        if (!$("#txt").children().last().children().eq(0).hasClass(strippedName)){
            $("#txt").append($("<div class='chatBoxMessage'>")
                .append($("<p class='messageInfo " + strippedName + "'>").text(name)));
        }
    }
    // if the name is the current user have a different styling
    if (name == ownName) {
        $("#txt").append($("<div class='chatBoxMessage'>")
            .append($("<p class='ownMessage " + strippedName + "'>").text(message)
            .append($("<p class='ownDateText'>").text(time))));
    } else {
        $("#txt").append($("<div class='chatBoxMessage'>")
        .append($("<p class='message " + strippedName + "'>").text(message)
        .append($("<p class='dateText'>").text(time))));
    }
}