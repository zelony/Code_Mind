<template>
  <ion-page>
   <Main_toolbar/>
    <ion-content :fullscreen="true">
      <list_overload apiName="staff-get" limit="20">
        <template v-slot:element="{el:team={}}">
          <ion-card :style="{background:team.color}" >
            <ion-card-header>
              <ion-card-title class="wt">
                {{team.name}}
                <ion-icon v-if="team.admin" :icon="star"></ion-icon>
              </ion-card-title>
              <add-button class="absl" @add="() => openWorkerModal(team)"/>
            </ion-card-header>
            <ion-card-content>
              <ion-item :router-link='`worker/${id}`' v-for="{id,name} in getUsers(team)" :key="id">
                <ion-icon :icon="personOutline" color="dark"/>
                <ion-label>{{name}} <ion-icon :icon="star" v-if="id === team.manager"></ion-icon></ion-label>
              </ion-item>
              <!--                  <ion-item class="ion-activated">-->
              <!--                    <ion-icon :icon="warning" slot="start"></ion-icon>-->
              <!--                    <ion-label>Card Button Item 1 activated</ion-label>-->
              <!--                  </ion-item>-->
              <!--                  <ion-item>-->
              <!--                    <ion-icon :icon="walk" slot="start"></ion-icon>-->
              <!--                    <ion-label>Card Button Item 2</ion-label>-->
              <!--                  </ion-item>-->
            </ion-card-content>
          </ion-card>
        </template>
      </list_overload>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="success" @click="addNewTeamModal">
          <ion-icon :icon="peopleOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonIcon,IonFab,IonFabButton,modalController,IonItem,IonLabel,IonCardContent, IonPage , IonContent,IonCard,IonCardHeader,IonCardTitle } from '@ionic/vue';
import {personOutline,star,peopleOutline} from "ionicons/icons"
import AddButton from "@/components/addButton";
import AddWorkerModal from "../modals/add-worker";
import AddTeamModal from "../modals/add-team";
import list_overload from "@/components/list_overload";
import Main_toolbar from "@/views/Home/main/main_toolbar";
export default  {
  name: 'staff',
  methods:{
    getUsers(team){
      if (!team.mids || !team.mnames)return []
      const ids = team.mids.trim().split(',');
      const names = team.mnames.trim().split(',');
      return ids.filter(x=>!!x.trim()).map((id,index) => {
        return {id,name:names[index]}
      });
    },
    async openWorkerModal(team){
      const modal = await modalController
          .create({
            component: AddWorkerModal,
            backdropDismiss:false,
            componentProps: {
              team
            },
          });
      await modal.present();
    },
    async addNewTeamModal(){
      const modal = await modalController
          .create({
            component: AddTeamModal,
            backdropDismiss:false,
            componentProps: {
            },
          });
      await modal.present();
    }
  },
  components: {
    Main_toolbar,
    list_overload,
    IonFab,IonFabButton,AddButton, IonCardContent,IonItem,IonLabel,IonIcon,IonContent, IonPage,IonCard,IonCardHeader,IonCardTitle
  },
  setup(){
    return {
      personOutline,star,peopleOutline
    }
  },
}
</script>
<style>
ion-card{
  color: white;
}
</style>