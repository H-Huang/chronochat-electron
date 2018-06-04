// notifications are not working for my machine
function createNotification(name, message) {
    var notification = {
        title: 'ChronoChat: message from ' + name,
        body: message,
        icon: '../assets/icons/ndn.png'
    }
    let myNotification = new window.Notification(notification.title, notification);
}
