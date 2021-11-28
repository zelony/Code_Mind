<template>
  <My_btn v-bind="$attrs" @click="$emit('add')" color="success" shape="round">
    <ion-icon slot="icon-only" class="wt" :icon="add"></ion-icon>
  </My_btn>
<!--  <ion-button  v-bind="$attrs">-->
<!--  </ion-button>-->
</template>

<script>
import {IonIcon} from "@ionic/vue";
import {add} from "ionicons/icons";
import My_btn from "@/components/my_btn";
export default {
  components:{My_btn,IonIcon},
  name: "addButton",
  setup(){
    return{
      add
    }
  }
}
</script>

<style scoped>

</style>