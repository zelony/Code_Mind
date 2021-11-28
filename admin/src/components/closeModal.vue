<template>
  <ion-buttons >
    <ion-button @click="closeModal">
      <ion-icon :icon="close"></ion-icon>
    </ion-button>
  </ion-buttons>
</template>

<script>
import {IonButtons,menuController,IonButton,IonIcon,modalController } from "@ionic/vue";
import {close} from "ionicons/icons";
export default {
  setup(){
    return{close}
  },
  methods:{
    closeModal(){
      if (this.menu){
        menuController.close(this.menu)
      }
      else{
        modalController.dismiss()
      }
    }
  },
  props:{
    menu:{type:[Boolean,String],default:false}
  },
  components:{IonButtons,IonButton,IonIcon },
  name: "closeModal"
}
</script>

<style scoped>

</style>