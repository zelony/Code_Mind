<template>
  <ion-page >
    <ion-content fill-height :fullscreen="true" color="primary" >
      <div class="center">
        <ion-card>
          <div id="firebaseui-auth-container"></div>
        </ion-card>
      </div>


    </ion-content>
  </ion-page>
</template>

<script>
const firebaseui = require("firebaseui");
import {IonPage,IonContent,IonCard} from "@ionic/vue";
export default {
  name: "login",
  components:{
    IonPage,IonContent,IonCard
  },
  data:()=>({showedUp:false}),
  methods:{
    prepare(){
      if (this.showedUp)return;
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.$auth);
      ui.start('#firebaseui-auth-container', {
        callbacks: {
          signInSuccessWithAuthResult: function() {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl:`${window.location.origin}/dashboard`,
        signInOptions: [
          {
            provider: this.$firebase.firebase_.auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: this.$firebase.firebase_.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
          },
          this.$firebase.firebase_.auth.GoogleAuthProvider.PROVIDER_ID,
          {
            provider:  this.$firebase.firebase_.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
              type: 'image', // 'audio'
              size: 'invisible', // 'invisible' or 'compact'
              badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
            },
            defaultCountry: 'EG', // Set default country to the United Kingdom (+44).
            // For prefilling the national number, set defaultNationNumber.
            // This will only be observed if only phone Auth provider is used since
            // for multiple providers, the NASCAR screen will always render first
            // with a 'sign in with phone number' button.
            defaultNationalNumber: '1234567890',
            // You can also pass the full phone number string instead of the
            // 'defaultCountry' and 'defaultNationalNumber'. However, in this case,
            // the first country ID that matches the country code will be used to
            // populate the country selector. So for countries that share the same
            // country code, the selected country may not be the expected one.
            // In that case, pass the 'defaultCountry' instead to ensure the exact
            // country is selected. The 'defaultCountry' and 'defaultNationaNumber'
            // will always have higher priority than 'loginHint' which will be ignored
            // in their favor. In this case, the default country will be 'GB' even
            // though 'loginHint' specified the country code as '+1'.
            loginHint: '+201063911844'
          }
        ],
        // Other config options...
      });

    }
  },
  mounted() {
    this.showedUp = false;
    this.prepare()
    console.log("mounted")
  },
  ionViewDidEnter() {
    this.prepare()
    console.log("entered")

  }
}
</script>

<style scoped>
#firebaseui-auth-container{
  height: 100%;
  width: 100%;
}
</style>