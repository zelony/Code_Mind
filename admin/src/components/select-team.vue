<template>
  <ion-item>
    <ion-label>Select Team</ion-label>
    <ion-select placeholder="Team" @ionChange="emitIt" :value="modelValue" :multiple="multiple">
      <ion-select-option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</ion-select-option>
    </ion-select>
  </ion-item>
</template>

<script>
import {IonLabel,IonSelect,IonSelectOption,IonItem} from "@ionic/vue";
import infinitescroll from "@/mixins/infinitescroll";
export default {
  components:{IonLabel,IonSelect,IonSelectOption,IonItem},
  name: "select-team",
  mixins:[infinitescroll],
  props:{
    multiple:{
      type:Boolean,
      default:false
    },
    modelValue:{
      required:true
    }
  },
  methods:{
    emitIt(ev){
      this.$emit('update:modelValue',ev.target.value)
    }
  },
  data:()=>({teams:[]}),
  setup(){
    return {
      apiName:'teams-get',
      infiniteScroll:{
        limit:20,
        key:'teams',
      },
    }
  },

}
</script>

<style scoped>

</style>