<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet/>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tasks" :href="`${l}/tasks`">
          <ion-icon :icon="checkboxOutline" />
          <ion-label>Tasks</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="calendar" :href="`${l}/calendar`">
          <ion-icon :icon="createOutline" />
          <ion-label>Edit</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="feedback" :href="`${l}/feedback`">
          <ion-icon :icon="callOutline" />
          <ion-label>Feedback</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="dashboard" :href="`${l}/dashboard`">
          <ion-icon :icon="apertureOutline" />
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { createOutline, callOutline, checkboxOutline ,apertureOutline} from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  computed:{
    l(){
      return `/project/${this.$route.params.id}`;
    }
  },
  setup() {
    return {
      createOutline,
      apertureOutline,
      callOutline,
      checkboxOutline,
    }
  }
}
</script>