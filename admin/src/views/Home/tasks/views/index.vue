<template>
  <ion-page>
    <Main_toolbar/>
    <Filter_tasks/>
    <ion-content id="tasks-content">
      <List_overload api-name="tasks-get" limit="30" :options="apiOptions" :sort-function="sortFunction">
        <template v-slot:element="{el:task={}}">
          <task :task="task" @priority="task.priority = $event" @finish="task.closed = $event"/>
        </template>
      </List_overload>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="success" @click="addNewTaskModal">
          <ion-icon :icon="add"/>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button color="primary" @click="openFilterTab">
            <ion-icon :icon="filter"/>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
// IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,
import {IonPage, IonContent, IonFab, IonFabButton, IonIcon, modalController, menuController} from "@ionic/vue";
import {add,filter} from "ionicons/icons";
import List_overload from "@/components/list_overload";
import AddNewTask from "../modal/addNewTask"
import Filter_tasks from "@/views/Home/tasks/modal/filter_tasks";
import {mapState} from "vuex";
import Task from "@/views/Home/tasks/components/task";
import Main_toolbar from "@/views/Home/main/main_toolbar";
export default {
  name: "index",
  components: {
    Main_toolbar,
    Task,
    // IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,
    Filter_tasks, List_overload,IonPage,IonContent,IonFab,IonFabButton,IonIcon},
  setup(){
    return{
      add,filter,
    }
  },
  computed:{
    ...mapState({filters:state=>state.task.filters}),
    apiOptions(){
      return{
        ...this.filters
      }
    }
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
    openFilterTab(){
      menuController.open("tasksFilter")
    },
    async addNewTaskModal(){
      const modal = await modalController
          .create({
            component: AddNewTask,
            backdropDismiss:false,
          });
      await modal.present();
    }
  }
}
</script>

<style scoped>

</style>