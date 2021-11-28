<template>
  <ion-page>
    <Main_toolbar :title="task.title"/>
    <ion-content v-if="task">
      <ion-refresher slot="fixed" @ionRefresh="fetchTaskData">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{task.title}}</ion-card-title>
          <ion-card-subtitle>{{task.description}}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <ion-chip></ion-chip>
        </ion-card-content>
      </ion-card>
      sss
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage,IonCardTitle,IonCardSubtitle,IonCardContent,IonCard,IonCardHeader,IonContent,IonRefresher,IonRefresherContent} from "@ionic/vue";
import Main_toolbar from "../../main/main_toolbar";
import loading from "@/mixins/loading";
export default {
  name: "task",
  mixins:[loading],
  data:()=>({task:null}),
  components:{IonPage,IonCardTitle,IonCardSubtitle,IonCardContent,IonContent,IonCard,IonCardHeader,Main_toolbar,IonRefresher,IonRefresherContent},
  methods:{
    async fetchTaskData(e=null){
      try {
        if (this.$route.name !== 'home-certainTask'){
          return;
        }
        await this.presentLoading()
        const result = await this.$store.dispatch("api/callApi",{
          name:"tasks-get",
          options:{id:this.$route.params.id,comments:true}
        });
        this.task = result[0];
      }
      catch (e) {
        this.$store.commit("toast/error",e)
      }
      finally {
        await this.dismissLoading();
        if (e) {
          e.target.complete();
        }
      }
    }
  },
  watch:{
    $route:{
      immediate:true,
      handler:"fetchTaskData"
    }
  }
}
</script>

<style scoped>

</style>