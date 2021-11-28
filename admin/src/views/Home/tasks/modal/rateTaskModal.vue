<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Rate This Task</ion-title>
      <close-modal slot="end"/>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <form @submit.prevent="rateTask">
      <ion-item>
        <ion-label>Rating</ion-label>
        <ion-input type="number" v-model="rate" min="0" max="10"/>
      </ion-item>
      <ion-item>
        <ion-label>Change Close Date</ion-label>
        <ion-datetime display-format="MM DD YYYY" v-model="close" placeholder="Leave if not changing"/>
      </ion-item>
      <add-button type="submit" :loading="loading"/>
    </form>
  </ion-content>
</template>

<script>
import loading from "@/mixins/loading";
import closeModal from "@/components/closeModal";
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonDatetime,
  IonLabel,
  IonTitle,
  IonToolbar,
  modalController
} from "@ionic/vue";
import AddButton from "@/components/addButton";

export default {
  mixins:[loading],
  name: "rateTaskModal",
  data:()=>({rate:0,close:null}),
  components:{AddButton, closeModal, IonContent, IonHeader,IonDatetime, IonToolbar,IonTitle,IonItem,IonLabel,IonInput},
  methods:{
    async rateTask(){
      try {
        if (this.errors.length>0)return;
        this.loading = true;
        // await this.presentLoading();
        const result = await this.$store.dispatch("api/callApi",{
          name:"tasks-rate",
          options:{
            id:this.task.id,
            rate:this.rate,
            close:this.close
          }
        });
        if (result){
          await modalController.dismiss();
        }
      }
      catch (e) {
        this.$store.commit("toast/error",e);
      }
      this.loading =false;
    }
  },
  computed:{
    errors(){
      const errors = [];
      if (!this.rate ){
        errors.push("Fill All Fields");
      }
      if (this.rate > 10 || this.rate < 0){
        errors.push("Rate Must Be between 0 and 10");
      }
      // if (this.task.occ.type === 0 && this.task.occ.deadline && this.task.occ.at){
      //   const deadline = new Date(this.task.occ.deadline)
      //   const atDate = new Date(this.task.occ.at);
      //   if (deadline < atDate){
      //     errors.push("Deadline can't be before start date")
      //   }
      // }
      return errors;
    }
  },
  props:{
    task:{}
  }
}
</script>

<style scoped>

</style>