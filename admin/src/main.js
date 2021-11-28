import {
    app as fbApp,
    firestore,
    auth,
    storage,
    messaging
} from "@/services/firebase";

import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {getPlatforms, IonicVue} from '@ionic/vue';

Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/style.css';
import './registerServiceWorker'
const app = createApp(App)
    .use(IonicVue)
app.use(router)
app.use(store)
app.config.globalProperties.$firebase = fbApp;
app.config.globalProperties.$firestore = firestore;
app.config.globalProperties.$auth = auth;
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$messaging =  getPlatforms().includes("mobileweb") || getPlatforms().includes("desktop") ? messaging : FirebaseMessaging;

app.mount('#app')
