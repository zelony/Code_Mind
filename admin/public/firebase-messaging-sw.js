importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js");
firebase.initializeApp({
  apiKey: "AIzaSyBVKDV7m0Nrnhez0YZKS4qPPSGwxjripZQ",
  authDomain: "code-mind-c31da.firebaseapp.com",
  projectId: "code-mind-c31da",
  storageBucket: "code-mind-c31da.appspot.com",
  messagingSenderId: "869653014662",
  appId: "1:869653014662:web:b139d90e9b8c3e392c4907"
});
const messaging = firebase.messaging();
// messaging.setBackgroundMessageHandler(payload => {
//   const title = payload.data.title;
//   // let iconpath = '';
//   const options = {
//     body:payload.data.message,
//     icon:'public/assets/main-logo.jpg'
//   }
//   return self.registration.showNotification(title,options)
// });
messaging.onBackgroundMessage(payload => {
  // console.log("[firebase-messaging-sw.js] Received background message", payload);
  // Customize notification here
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon.png",
    tag: payload.collapseKey
  };
  if (payload.notification.image) {
    notificationOptions.image = payload.notification.image;
  }
  self.registration.showNotification(
      payload.notification.title,
      notificationOptions
  );
});
