<template>
  <ion-page>
    <Projects_toolbar/>
    <ion-content fullscreen class="ion-padding">
      <Comming_soon/>

    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage,IonContent} from "@ionic/vue";
import Projects_toolbar from "@/views/Projects/main/projects_toolbar";
import Comming_soon from "@/components/comming_soon";
export default {
  name: "index",
  components: {Comming_soon, Projects_toolbar,IonPage,IonContent}
}
</script>

<style scoped>

</style>