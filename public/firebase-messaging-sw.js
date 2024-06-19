
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDynb-ztFfX2xC8o-zI0h04inrlatrVCgo",
  authDomain: "treasurebox-70ef6.firebaseapp.com",
  projectId: "treasurebox-70ef6",
  storageBucket: "treasurebox-70ef6.appspot.com",
  messagingSenderId: "175205351575",
  appId: "1:175205351575:web:51e9082fd17f28123669d2",
  measurementId: "G-Y9W00L7142"
  };


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
