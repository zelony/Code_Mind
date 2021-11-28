<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>{{homePage}}</ion-title>
      <ion-buttons slot="secondary">
        <ion-button fill="clear" router-link="/dashboard">
          <ion-icon slot="start" :icon="arrowBack"/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import {IonHeader, IonButtons, IonButton, IonToolbar, IonTitle, IonIcon} from "@ionic/vue";
import {arrowBack} from "ionicons/icons";
export default {
  components:{IonHeader,IonButtons,IonButton,IonToolbar,IonTitle,IonIcon},
  name: "projects_toolbar",
  setup(){
    return{
      arrowBack
    }
  },
  computed:{
    homePage(){
      let name = this.$route.meta.title || this.$route.name || this.$route.path;
      name= `${name.charAt(0).toUpperCase() + name.slice(1)}`;
      return name
    }
  }
}
</script>

<style scoped>

</style>