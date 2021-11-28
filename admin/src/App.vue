<template>
  <ion-app>
    <ion-router-outlet />
    <loader/>
    <!--    <ion-nav />-->
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import messaging from "@/mixins/messaging";
import Loader from '@/components/loader';
import {mapState} from "vuex";
export default {
  name: 'App',
  mixins:[messaging],
  components: {
    Loader,
    IonApp,
    IonRouterOutlet
  },
  mounted() {
    this.loginListener();
  },
  computed:{
    ...mapState({loaded:"loaded"}),
  },
  methods:{
    async loginListener(){
      this.$auth.onAuthStateChanged(
          async user => {
            try {
              this.$store.commit("set", [
                "loading",
                { show: true, text: "Checking Data" }
              ]);
              console.log(user);
              if (user) {
                await this.$auth.setPersistence(
                    this.$firebase.firebase_.auth.Auth.Persistence.LOCAL
                );

                const res = await this.$store.dispatch("api/callApi", {
                  name: "login-admin"
                });
                if (!res){
                  this.$store.commit("toast/error",{
                    code:"not-authorized",
                    message:"failed to log in"
                  });
                  await this.$auth.signOut();
                  return;
                }


                const number = user.phoneNumber ? user.phoneNumber.replace('+2','') : null;
                await this.$store.commit("auth/set", [
                  "user",
                  {
                    id:user.uid,
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    profile_pic: user.photoURL,
                    number,
                    providers:user.providerData,
                  }
                ]);
                const needsSetup = false;
                if (needsSetup) {
                  if (!this.$route.matched.some(r => r.name === "Profile")) {
                    await this.$router
                        .push("/profile")
                        .catch(console.log);
                  }
                } else {
                  console.log(this.$route.matched.some(r => r.meta.onlyWhenLogout))
                  if (this.$route.matched.some(r => r.meta.onlyWhenLogout)) {
                    await this.$router.push("/main/dashboard").catch(console.log);
                    console.log("gone")
                  }
                }
                this.saveMessagingDeviceToken();
                this.listenToTokenChange();
                await this.$store.commit("set", ["loaded", true]);
                await this.$store.commit('auth/set', ['loaded',true]);
              } else {
                this.$store.commit("set", ["user", {}]);
                this.$store.commit("set", ["loaded", true]);
                await this.$store.commit('auth/set', ['loaded',true]);
                if (!this.$route.matched.some(r => r.meta.onlyWhenLogout)) {
                  await this.$router.push({ name: "Login" }).catch(console.log);
                }
              }
              console.log("ss")
              this.$store.commit("set", [
                "loading",
                { show: false, text: "Loading" }
              ]);

            } catch (e) {
              this.$store.commit("toast/error", e);
            }
          },
          e => this.$store.commit("toast/error", e)
      );
    },
  }
};
</script>