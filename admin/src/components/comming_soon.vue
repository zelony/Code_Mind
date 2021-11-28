<template>
<div class="fill ion-justify-content-center ion-align-items-center" style="display: flex">
  <ion-icon :src="coming" class="font"/>
</div>
</template>

<script>
import {IonIcon} from "@ionic/vue"
export default {
  name: "comming_soon",
  components:{IonIcon},
  setup(){
    return{
      coming:require('@/assets/coming-soon.svg')
    }
  }
}
</script>

<style scoped>
.font{
  font-size: 200px;
  color: #3a7be0;
}
</style>