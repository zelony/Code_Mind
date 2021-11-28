<template>
  <ion-menu side="end" menu-id="tasksFilter" content-id="tasks-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Search Filter</ion-title>
        <closeModal slot="end" menu="tasksFilter"/>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <div>
          <ion-label>Type:{{occTypes[filters.type]}}</ion-label>
          <ion-segment scrollable v-model="filters.type">
            <ion-segment-button value="0">
              <ion-icon :icon="today"/>
            </ion-segment-button>
            <ion-segment-button value="1">
              <ion-icon :icon="archiveOutline"/>
            </ion-segment-button>
            <ion-segment-button value="2">
              <ion-icon :icon="calendarNumber"/>
            </ion-segment-button>
            <ion-segment-button value="3">
              <ion-icon :icon="checkmarkOutline"/>
            </ion-segment-button>
            <ion-segment-button value="4">
              <ion-icon :icon="calendarClear" />
            </ion-segment-button>
            <ion-segment-button value="5">
              <ion-icon :icon="checkmarkDoneOutline"/>
            </ion-segment-button>
          </ion-segment>
        </div>
        <select-team v-model="filters.team"/>
        <select-user v-model="filters.user"/>
        <select-project v-model="filters.project"/>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import closeModal from "@/components/closeModal";
import {archiveOutline,calendarClear,calendarNumber,checkmarkOutline,checkmarkDoneOutline} from "ionicons/icons";
import {IonMenu,IonList,IonLabel,IonSegment,IonSegmentButton,IonIcon,IonHeader,IonToolbar,IonTitle,IonContent} from "@ionic/vue";
import {mapState} from "vuex";
import SelectTeam from "@/components/select-team";
import SelectUser from "@/components/select-user";
import {occTypes} from "@/global";
import SelectProject from "@/components/select-project";
export default {
  name: "filter_tasks",
  setup(){
    return{archiveOutline,today:require('@/assets/icons/today_black_24dp.svg'),calendarClear,calendarNumber,checkmarkOutline,checkmarkDoneOutline,occTypes}
  },
  data:()=>({

  }),
  computed:{
    ...mapState({filtersObj:state=>state.task.filters}),
    filters:{
      get(){
        return this.filtersObj
      },
      set(v){
        // this.$store.commit("task/changeFilter",[])
        console.log(v);
      }
    }
  },
  components:{
    SelectProject,
    SelectUser,
    SelectTeam,
    closeModal,IonLabel,IonMenu,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonSegment,IonSegmentButton,IonIcon,
  }
}
</script>

<style scoped>

</style>