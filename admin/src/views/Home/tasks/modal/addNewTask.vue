<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Add New Task</ion-title>
      <close-modal slot="end"/>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <form @submit.prevent="addNewTask">
      <ion-item>
        <ion-label>Title</ion-label>
        <ion-input v-model="task.title"/>
      </ion-item>
      <ion-item>
        <ion-label>Description</ion-label>
        <ion-textarea v-model="task.description"/>
      </ion-item>
      <occurance-item v-model="task.occ"/>
      <select-team v-model="task.team"/>
      <select-user :options="{team:task.team}" v-if="task.team" v-model="task.member"/>
      <select-project v-model="task.project"/>
      <ion-item>
        <ion-label>Points</ion-label>
        <ion-input v-model="task.points" type="number"/>
      </ion-item>
      <template v-if="errors && errors.length >0">
        <ion-item color="danger"  v-for="(error,i) in errors" :key="i">
          <ion-label >
            {{error}}
          </ion-label>
        </ion-item>
      </template>
      <add-button :loading="loading" type="submit"/>
    </form>
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  modalController
} from "@ionic/vue";
import closeModal from "@/components/closeModal";
import OccuranceItem from "@/views/Home/tasks/components/occuranceItem";
import SelectUser from "@/components/select-user";
import SelectTeam from "@/components/select-team";
import AddButton from "@/components/addButton";
import loading from "@/mixins/loading";
import SelectProject from "@/components/select-project";

export default {
  name: "addNewTask",
  mixins:[loading],
  components:{
    SelectProject,
    AddButton, SelectTeam, SelectUser, OccuranceItem, closeModal, IonContent, IonHeader, IonToolbar,IonTitle,IonItem,IonLabel,IonInput,IonTextarea},
  data:()=>({
    task:{
      title:null,
      description:null,
      occ:{
        type:0,
        at:null,
        deadline:null,
        finish:null
      },
      project:null,
      member:null,
      team:null,
      points:1
    }
  }),
  methods:{
    async addNewTask(){
      try {
        if (this.errors.length>0)return;
        this.loading = true;
        // await this.presentLoading();
        const result = await this.$store.dispatch("api/callApi",{
          name:"tasks-add",
          options:{
            ...this.task
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
      // await this.dismissLoading();
    }
  },
  computed:{
    errors(){
      const errors = [];
      if (!this.task.title || !this.task.description || !this.task.points  || !this.task.team ){
        errors.push("Fill All Fields");
      }
      if (this.task.occ.type === 0 && this.task.occ.deadline && this.task.occ.at){
        const deadline = new Date(this.task.occ.deadline)
        const atDate = new Date(this.task.occ.at);
        if (deadline < atDate){
          errors.push("Deadline can't be before start date")
        }
      }
      return errors;
    }
  }
}
</script>

<style scoped>

</style>