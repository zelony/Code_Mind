<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet/>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="staff" href="/main/staff">
          <ion-icon :icon="personOutline" />
          <ion-label>Staff</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="projects" href="/main/projects">
          <ion-icon :icon="listOutline" />
          <ion-label>Projects</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="feedback" href="/main/tasks">
          <ion-icon :icon="checkboxOutline" />
          <ion-label>Tasks</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="dashboard" href="/main/dashboard">
          <ion-icon :icon="apertureOutline" />
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { personOutline, listOutline, checkboxOutline ,apertureOutline} from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      personOutline,
      apertureOutline,
      listOutline,
      checkboxOutline,
    }
  }
}
</script>