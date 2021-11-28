<template>
  <ion-page>
    <Main_toolbar/>
    <ion-content :fullscreen="true">
      <Comming_soon/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage,  IonContent } from '@ionic/vue';
import Main_toolbar from "@/views/Home/main/main_toolbar";
import Comming_soon from "@/components/comming_soon";
export default {
  name: "index",
  components: {Comming_soon, Main_toolbar, IonContent, IonPage }

}
</script>

<style scoped>

</style>