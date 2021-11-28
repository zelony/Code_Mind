<template>
  <ion-item>
    <ion-label>Select Project</ion-label>
    <ion-select placeholder="Project" @ionChange="emitIt" :value="modelValue" :multiple="multiple">
      <ion-select-option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</ion-select-option>
    </ion-select>
  </ion-item>
</template>

<script>
import {IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/vue";
import infinitescroll from "@/mixins/infinitescroll";

export default {
  name: "select-project",
  components:{IonLabel,IonSelect,IonSelectOption,IonItem},
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
  data:()=>({projects:[]}),
  setup(){
    return {
      apiName:'projects-get',
      infiniteScroll:{
        limit:20,
        key:'projects',
      },
    }
  },
}
</script>

<style scoped>

</style>