<template>
  <ion-item>
    <ion-label>Select User</ion-label>
    <ion-select v-bind="$attrs" @ionChange="emitIt" :value="modelValue" >
      <ion-select-option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</ion-select-option>
    </ion-select>
  </ion-item>
</template>

<script>
import {IonLabel,IonSelect,IonSelectOption,IonItem} from "@ionic/vue";
import infinitescroll from "@/mixins/infinitescroll";
export default {
  components:{IonLabel,IonSelect,IonSelectOption,IonItem},
  name: "select-user",
  mixins:[infinitescroll],
  props:{
    modelValue:{
      required:true
    },
    options:{
      type:Object,
      default:()=>{}
    }
  },
  emits:['selected'],
  methods:{
    emitIt(ev){
      this.$emit('update:modelValue',ev.target.value)
    }
  },
  data:()=>({users:[]}),
  setup(){
    return {
      apiName:'workers-getIds',
      infiniteScroll:{
        limit:20,
        key:'users',
      },
    }
  },

}
</script>

<style scoped>

</style>