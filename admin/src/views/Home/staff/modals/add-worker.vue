<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Add to {{team.name}}</ion-title>
      <closeModal slot="end"/>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label>Existing</ion-label>
      <ion-checkbox
          slot="end"
          v-model="exsisting"
      >
      </ion-checkbox>
    </ion-item>
    <form @submit.prevent="addNewWorker">
      <select-user :options="{notTeam:team.id}" v-model="worker.id" v-if="exsisting"/>
      <template v-else>
        <ion-item>
          <ion-label>Name</ion-label>
          <ion-input v-model="worker.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Phone</ion-label>
          <ion-input v-model="worker.phone" type="number"/>
        </ion-item>
        <ion-item>
          <ion-label>Male</ion-label>
          <ion-checkbox
              slot="end"
              v-model="worker.male"
          >
          </ion-checkbox>
          <!--            @update:modelValue="entry.isChecked = $event"-->
          <!--            :modelValue="entry.isChecked"-->
        </ion-item>
      </template>

      <add-button type="submit"/>
    </form>
  </ion-content>
</template>

<script>
import {IonContent, IonHeader,IonLabel,IonCheckbox,IonInput, IonTitle, IonToolbar,IonItem, modalController} from '@ionic/vue';
import closeModal from "@/components/closeModal";
import AddButton from "@/components/addButton";
import SelectUser from "@/components/select-user";
export default {
  name: "add-worker-modal",
  data:()=>({worker:{},exsisting:false}),
  components: {
    SelectUser,
    AddButton, IonContent, IonHeader, IonTitle, IonToolbar,closeModal,IonLabel,IonCheckbox,IonInput,IonItem },
  props:{
    team:{
      type:Object,
      default:()=>{}
    }
  },
  methods:{
    async addNewWorker(){
      try {
        const result = await this.$store.dispatch("api/callApi",{
          name:"workers-add",
          options:{
            worker:{...this.worker,team:this.team.id}
          }
        })
        if (result){
          await modalController.dismiss();
          this.worker = {};
        }
      }
      catch (e) {
       this.$store.commit("toast/error",e);
      }
    }
  },
  watch:{
    team:{
      immediate:true,
      handler(){
        this.worker = {};
      }
    }
  }
}
</script>

<style scoped>

</style>