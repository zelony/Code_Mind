<template>
  <ion-page>
    <Main_toolbar/>
    <ion-content :fullscreen="true">
      <list_overload apiName="projects-get" limit="20" :sort-function="sortFunction">
        <template v-slot:element="{el:project={}}">
          <ion-item :style="{'--background':project.color,'--color':'white','--min-height':'90px'}">
            <div slot="start">
              <ion-thumbnail  v-if="project.thumb">
                <img :src="project.thumb">
              </ion-thumbnail>

            </div>
            <div class="fill">
              <ion-label>{{ project.name }}</ion-label>
              <ion-chip color="light">
                <ion-icon :icon="checkmarkDone"></ion-icon>
                <ion-label>{{ project.tCount }}</ion-label>
              </ion-chip>
              <ion-chip color="light">
                <ion-icon :icon="hourglass"></ion-icon>
                <ion-label>{{ time(new Date(project.start))  }}</ion-label>
              </ion-chip>
            </div>

            <Priority_changer slot="end" name="projects-priority" :id="project.id" v-model="project.priority" />
          </ion-item>
<!--          <ion-item-sliding>-->
<!--            <ion-item-options side="start">-->
<!--              <ion-item-option >Favorite</ion-item-option>-->
<!--              <ion-item-option color="danger" >Share</ion-item-option>-->
<!--            </ion-item-options>-->

<!--            <ion-item>-->
<!--              <ion-label>Item Options</ion-label>-->
<!--            </ion-item>-->

<!--            <ion-item-options side="end">-->
<!--              <ion-item-option >Unread</ion-item-option>-->
<!--            </ion-item-options>-->
<!--          </ion-item-sliding>-->
<!--          <ion-card :style="{background:project.color}" >-->
<!--            <ion-card-header>-->
<!--              <ion-card-title class="wt">-->
<!--                {{project.name}}-->
<!--&lt;!&ndash;                <ion-icon v-if="team.admin" :icon="star"></ion-icon>&ndash;&gt;-->
<!--              </ion-card-title>-->
<!--&lt;!&ndash;              <add-button class="absl" @add="openWorkerModal(team)"/>&ndash;&gt;-->
<!--            </ion-card-header>-->
<!--            <ion-card-content>-->
<!--              <ion-item :router-link='`team/${id}`' v-for="{id,name} in getTeams(project)" :key="id">-->
<!--                <ion-icon :icon="peopleCircle" color="dark"/>-->
<!--                <ion-label>{{name}}</ion-label>-->
<!--              </ion-item>-->
<!--              &lt;!&ndash;                  <ion-item class="ion-activated">&ndash;&gt;-->
<!--              &lt;!&ndash;                    <ion-icon :icon="warning" slot="start"></ion-icon>&ndash;&gt;-->
<!--              &lt;!&ndash;                    <ion-label>Card Button Item 1 activated</ion-label>&ndash;&gt;-->
<!--              &lt;!&ndash;                  </ion-item>&ndash;&gt;-->
<!--              &lt;!&ndash;                  <ion-item>&ndash;&gt;-->
<!--              &lt;!&ndash;                    <ion-icon :icon="walk" slot="start"></ion-icon>&ndash;&gt;-->
<!--              &lt;!&ndash;                    <ion-label>Card Button Item 2</ion-label>&ndash;&gt;-->
<!--              &lt;!&ndash;                  </ion-item>&ndash;&gt;-->
<!--            </ion-card-content>-->
<!--          </ion-card>-->
        </template>
      </list_overload>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="success" @click="addNewProjectModal">
          <ion-icon :icon="add"/>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonIcon,
  IonFab,
  IonFabButton,
  IonPage,
  IonContent,
    IonLabel,
    IonItem,IonChip,
  modalController,IonThumbnail
  // IonItemOption,
  // IonItemOptions,
  // IonItemSliding,
} from '@ionic/vue';
import list_overload from "@/components/list_overload";
import AddNewProject from "../modals/add-project";
import {add,peopleCircle,checkmarkDone,hourglass} from "ionicons/icons";
import Priority_changer from "@/components/priority_changer";
import timeAgo from "@/mixins/timeAgo";
import Main_toolbar from "@/views/Home/main/main_toolbar";
export default {
  name: "projects",
  setup(){
    return{
      add,peopleCircle,checkmarkDone,hourglass
    }
  },
  mixins:[timeAgo],
  components:{
    Main_toolbar,
    Priority_changer,IonLabel,
    list_overload,IonFab,IonFabButton,IonIcon,IonThumbnail, IonContent, IonPage,IonItem,IonChip,
    // IonItemOption,
    // IonItemOptions,
    // IonItemSliding,
  },
  methods:{
    sortFunction(a,b){
      if ( a.priority < b.priority ){
        return 1;
      }
      if ( a.priority > b.priority ){
        return -1;
      }
      return 0;
    },
    getTeams(project){
      if (!project.tids || !project.tnames)return []
      const ids = project.tids.trim().split(',');
      const names = project.tnames.trim().split(',');
      return ids.filter(x=>!!x.trim()).map((id,index) => {
        return {id,name:names[index]}
      });
    },
    async addNewProjectModal(){
      const modal = await modalController
          .create({
            component: AddNewProject,
            backdropDismiss:false,
            componentProps: {},
          });
      await modal.present();
    }
  }
}
</script>

<style scoped>
</style>