<template>
  <ion-page>
    <Projects_toolbar/>
    <ion-content :fullscreen="true">
     <Comming_soon/>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import Comming_soon from "@/components/comming_soon";
import Projects_toolbar from "@/views/Projects/main/projects_toolbar";
export default {
  name: "feedback",
  components: {Projects_toolbar, Comming_soon, IonContent, IonPage }

}
</script>

<style scoped>

</style>