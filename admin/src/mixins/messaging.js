import {LocalNotifications} from '@ionic-native/local-notifications';
const vp = 'BOdDY-xlJ039tvTpSy16svqhu_Wa1D7PhKnSgClSq91PvOeowylVhmgpScgup6yYNDmPcuy3dNA4h4IyXqrXGHY'
export default {
  methods:{
    async saveMessagingDeviceToken() {
      try{
        let currentToken = await this.$messaging.getToken({
          vapidKey:vp
        });
        if (currentToken) {
          await this.$firestore.collection('fcmTokens').doc(this.$store.state.auth.user.uid).set({token:currentToken});
        } else {
          await this.requestNotificationsPermissions();
        }
      }
      catch(e){
        this.$store.commit("toast/error",e);
      }
    },
    async requestNotificationsPermissions() {
      try{
        await this.$messaging.requestPermission();
        await this.saveMessagingDeviceToken();
      }
      catch (e) {
        this.$store.commit("toast/error",e);
      }
    },
    listenToTokenChange(){
      try{
          this.$messaging.onTokenRefresh( ()=> {
            this.saveMessagingDeviceToken()
          });
          this.$messaging.onMessage((payload) => {
            LocalNotifications.schedule({
              id: payload.notification.tag,
              text: payload.notification.title,
            });
          })
      }
      catch (e) {
        this.$store.commit("toast/error",e);
      }
    }
  },
}
