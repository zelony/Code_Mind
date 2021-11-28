<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Add Project</ion-title>
      <closeModal slot="end"/>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <form @submit.prevent="addNewProject">
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input v-model="project.name" ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Description</ion-label>
        <ion-textarea v-model="project.description" />
      </ion-item>
      <ion-item>
        <ion-label>Start Date</ion-label>
        <ion-datetime display-format="MM DD YYYY" v-model="project.start" placeholder="Select Date"/>
      </ion-item>
      <select-team v-model="project.teams" multiple/>
      <select-user :value="project.admin" @selected="project.admin = $event"/>
      <add-button type="submit"/>
    </form>
  </ion-content>
</template>

<script>
import closeModal from "@/components/closeModal";
import AddButton from "@/components/addButton";
import SelectTeam from "@/components/select-team";
import {
  IonItem,
  IonContent,
  IonHeader,
  IonToolbar,
  IonInput,
  IonLabel,
  IonDatetime,
  IonTextarea,
  modalController
} from "@ionic/vue";
import loading from "@/mixins/loading";
import SelectUser from "@/components/select-user";
export default {
  name: "add-project-modal",
  mixins:[loading],
  components:{
    SelectUser,
    SelectTeam, AddButton, closeModal,IonItem,IonContent,IonHeader,IonToolbar,IonInput,IonLabel,IonDatetime,IonTextarea},
  data:()=>({
    project:{
      name:null,
      description:null,
      start:null,
      teams:[],
      admin:null
    }
  }),
  methods:{
    async addNewProject(){
      try {
        await this.presentLoading({});
        await this.$store.dispatch("api/callApi",{
          name:"projects-add",
          options:{
            ...this.project
          }
        });
       await modalController.dismiss();
      }
      catch (e) {
        this.$store.commit("toast/error",e);
      }
      await this.dismissLoading();
    }
  }
}
</script>

<style scoped>

</style>