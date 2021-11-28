<template>
  <div class="hand">
    <ion-button @click="changePriorityUp" :disabled="loading" fill="solid" color="white" shape="round" size="small">
      <ion-icon :icon="arrowUp"></ion-icon>
    </ion-button>
    <ion-spinner v-if="loading" name="crescent" color="white"/>
    <ion-title v-else>{{modelValue}}</ion-title>
    <ion-button @click="changePriorityDown" :disabled="loading" fill="solid" color="white" shape="round" size="small">
      <ion-icon :icon="arrowDown"></ion-icon>
    </ion-button>
  </div>
</template>

<script>
import {arrowUp,arrowDown} from "ionicons/icons";
import {IonButton,IonIcon,IonTitle,IonSpinner} from "@ionic/vue";
export default {
  name: "priority_changer",
  components:{IonButton,IonIcon,IonTitle,IonSpinner},
  data:()=>({
    loading:false
  }),
  setup(){
    return{
      arrowUp,arrowDown
    }
  },
  methods:{
    changePriorityUp(){
      this.changePriority(1)
    },
    changePriorityDown(){
      this.changePriority(-1)
    },
   async changePriority(value){
      try {
        this.loading =true;
        const r = await this.$store.dispatch("api/callApi",{
          name:this.name,
          options:{
            id:this.id,
            value:this.modelValue + value
          }
        });
        if (r){
          this.$emit("update:modelValue",this.modelValue + value)
        }
      }
      catch (e) {
        this.$store.commit("toast/error");
      }
      this.loading = false;
    }
  },
  props:{
    modelValue:{},
    id:{},
    name:{}
  }
}
</script>

<style scoped>
.hand{
  display: flex;
  flex-direction: column;
}
</style>