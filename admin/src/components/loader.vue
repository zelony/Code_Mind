<template>
  <transition name="fade">
    <ion-page v-if="loading.show">
      <ion-content color="dark">
        <div class="center" style="flex-direction: column">
<!--          <img :src="require('@/logos/main-outline.png')" alt="loader">-->
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      </ion-content>
    </ion-page>
  </transition>
</template>

<script>
import {IonPage,IonContent} from "@ionic/vue";
import {mapState} from "vuex";
export default {
  name: "loader",
  components:{IonPage,IonContent},
  computed:{
    ...mapState({loading:"loading"}),
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
