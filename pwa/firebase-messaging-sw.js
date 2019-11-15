// PS.:  esse arquivo deve estar na raiz do projeto, junto com o index.html
// PS2.: o arquivo é criado pois, após importar os scripts do firebase, ele irá procurar um arquivo com esse nome que funciona como um "ouvinte"

importScripts("https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.4.0/firebase-messaging.js");

firebase.initializeApp({
    "messagingSenderId": "695655950971"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log("[PushNotification] Received background message ", payload);
    return self.registration.showNotification({}, {});
});