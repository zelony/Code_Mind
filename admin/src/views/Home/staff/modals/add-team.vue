<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Add team</ion-title>
      <closeModal slot="end"/>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <form @submit.prevent="addNewTeam">
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input v-model="team.name" />
      </ion-item>
      <ion-item>
        <ion-label>Admin</ion-label>
        <ion-checkbox
            slot="end"
            v-model="team.admin"
        >
        </ion-checkbox>
        <!--            @update:modelValue="entry.isChecked = $event"-->
        <!--            :modelValue="entry.isChecked"-->
      </ion-item>
      <add-button type="submit"/>
    </form>
  </ion-content>
</template>

<script>
import AddButton from "@/components/addButton";
import {
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  modalController
} from "@ionic/vue";
import closeModal from "@/components/closeModal";

export default {
  components: {AddButton, IonContent, IonHeader, IonTitle, IonToolbar,closeModal,IonLabel,IonCheckbox,IonInput,IonItem },
  name: "add-team",
  data:()=>({
    team:{
      color:"",
      name:"",
      admin:false
    }
  }),
  methods:{
    async addNewTeam(){
      try {
        const result = await this.$store.dispatch("api/callApi",{
          name:"teams-add",
          options:{
            team:this.team
          }
        })
        if (result){
          await modalController.dismiss();
        }
      }
      catch (e) {
        this.$store.commit("toast/error",e);
      }
    }
  }
}
</script>

<style scoped>

</style>