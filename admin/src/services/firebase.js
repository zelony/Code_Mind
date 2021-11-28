import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/functions";
// if (process.env.NODE_ENV === 'development'){
//   window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
// }
// import "firebase/app-check";
import "firebase/messaging";
// import { siteRecaptchaId } from "@/CONSTS";
let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp({
        apiKey: "AIzaSyBVKDV7m0Nrnhez0YZKS4qPPSGwxjripZQ",
        authDomain: "code-mind-c31da.firebaseapp.com",
        projectId: "code-mind-c31da",
        storageBucket: "code-mind-c31da.appspot.com",
        messagingSenderId: "869653014662",
        appId: "1:869653014662:web:b139d90e9b8c3e392c4907"
    });
} else {
    app = firebase.app();
}
// const appCheck = firebase.appCheck();
// appCheck.activate(siteRecaptchaId);
// const appCheck = firebase.appCheck();
// appCheck.activate("6LcklEIbAAAAADgdgRaCx-_iAJVFrlDzItfkRCl1");

// console.log(appCheck);
const firestore = app.firestore();
const auth = app.auth();
const functions = app.functions();
if (process.env.NODE_ENV !== "production") {
    firestore.useEmulator("localhost", 1000);
    auth.useEmulator("http://localhost:9099/");
    functions.useEmulator("localhost", 5001);
}

export const storage = app.storage();
export const messaging = app.messaging();

export { app, firebase, firestore, auth, functions };
export default app;
