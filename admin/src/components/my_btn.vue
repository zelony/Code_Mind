<template>
<ion-button v-bind="$attrs" @click="$emit('click')">
  <ion-spinner name="crescent" v-if="loading"/>
  <slot v-else/>
</ion-button>
</template>

<script>
import {IonButton,IonSpinner} from "@ionic/vue";
export default {
  inheritAttrs:true,
  name: "loading_btn",
  components:{IonButton,IonSpinner},
  props:{
    loading:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>

</style>