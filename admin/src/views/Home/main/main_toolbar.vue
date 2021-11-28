<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>{{title || homePage}}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import {IonHeader,IonToolbar,IonTitle} from "@ionic/vue";
export default {
  components:{IonHeader,IonToolbar,IonTitle},
  name: "main_toolbar",
  computed:{
    homePage(){
      let name = this.$route.meta.title || this.$route.name || this.$route.path;
      name= `${name.charAt(0).toUpperCase() + name.slice(1)}`;
      return name
    }
  },
  props:{
    title:{
      type:String,
      default:null
    }
  }
}
</script>

<style scoped>

</style>