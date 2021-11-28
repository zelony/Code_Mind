<template>
  <ion-spinner v-if="loading" name="crescent" color="white"/>
  <ion-checkbox  @update:modelValue="check"
                 :modelValue="modelValue"
                 v-else
  ></ion-checkbox>
</template>

<script>
import {IonSpinner,IonCheckbox} from "@ionic/vue";

export default {
  components:{IonSpinner,IonCheckbox},
  name: "taskFinish",
  data:()=>({
    loading:false
  }),
  methods:{
    async check(){
      try {
        this.loading =true;
        const r = await this.$store.dispatch("api/callApi",{
          name:'tasks-check',
          options:{
            id:this.id,
            value:!this.modelValue
          }
        });
        if (r){
          this.$emit("checked",!this.modelValue);
          this.$emit("update:modelValue",!this.modelValue)
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

</style>