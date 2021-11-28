<template>
  <ion-item ref="element" :style="{'--background':'#3498db','--color':'white','--min-height':'90px'}">
    <div slot="start">
      <task-finish :id="task.id" :model-value="task.closed" @update:modelValue="changeIt"/>
    </div>
    <div class="fill">
      <ion-label>{{ task.title }}</ion-label>
      <ion-card-subtitle>{{task.description}}</ion-card-subtitle>
      <ion-chip color="light">
        <ion-icon :icon="alarm_off"/>
        <ion-label>{{ time(new Date(task.deadline)) }}</ion-label>
      </ion-chip>
      <ion-chip color="light">
        <ion-icon :icon="person"/>
        <ion-label>{{ task.member || 'No user' }}</ion-label>
      </ion-chip>
      <ion-chip color="light">
        <ion-icon :icon="cashOutline"/>
        <ion-label>{{ task.points }}</ion-label>
      </ion-chip>
      <ion-chip color="light">
        <ion-icon :icon="recurring"/>
        <ion-label>{{occTypes[task.runType] }}</ion-label>
      </ion-chip>
      <ion-chip color="light">
        <ion-icon :icon="peopleCircleOutline"/>
        <ion-label>{{ task.team }}</ion-label>
      </ion-chip>
      <ion-chip :color="task.pcolor">
        <ion-icon :icon="appsOutline"/>
        <ion-label>{{ task.project }}</ion-label>
      </ion-chip>
      <template v-if="task.closed && !task.finish">
        <ion-button color="success" @click="openRateModal">Rate</ion-button>
      </template>
      <!--              <ion-chip color="light">-->
      <!--                <ion-icon :icon="hourglass"></ion-icon>-->
      <!--                <ion-label>{{ time(new Date(task.start))  }}</ion-label>-->
      <!--              </ion-chip>-->
    </div>
    <Priority_changer slot="end" name="tasks-priority" :id="task.id" :model-value="task.priority" @update:modelValue="$emit('priority',$event)" />
  </ion-item>
</template>

<script>
import TaskFinish from "@/views/Home/tasks/components/taskFinish";
import Priority_changer from "@/components/priority_changer";
import {IonCardSubtitle,IonButton, IonChip, IonItem, IonLabel, IonIcon, modalController} from "@ionic/vue";
import {cashOutline,appsOutline, peopleCircleOutline, person} from "ionicons/icons";
import {occTypes} from "@/global";
import timeAgo from "@/mixins/timeAgo";
import rateTaskModal from "@/views/Home/tasks/modal/rateTaskModal";
export default {
  mixins:[timeAgo],
  name: "task",
  components:{
    TaskFinish,IonButton,
    Priority_changer,IonItem,IonLabel,IonCardSubtitle,IonChip,IonIcon
  },
  setup(){
    return{
      alarm_off:require('@/assets/icons/alarm_off.svg'),
      person,cashOutline,
      recurring:require('@/assets/icons/restore_black_24dp.svg'),
      occTypes,appsOutline,
      peopleCircleOutline
    }
  },
  methods:{
    async changeIt(val){
      this.$emit("finish",val);
      this.fadeOutEffect(this.$refs.element.$el);
    },
    fadeOutEffect(fadeTarget) {
      fadeTarget.style.transition= 'opacity .2s'
      fadeTarget.style.pointerEvents = 'none';
  var fadeEffect = setInterval(function () {
    if (!fadeTarget.style.opacity) {
      fadeTarget.style.opacity = 1;
    }
    if (fadeTarget.style.opacity > 0) {
      fadeTarget.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 200);
},
    async openRateModal(){
      const modal = await modalController.create({
        animated:true,
        backdropDismiss:false,
        component:rateTaskModal,
        componentProps:{
          task:this.task
        }
      });
      await modal.present();
    }
  },
  props:{
    task:{}
  }
}
</script>

<style scoped>

</style>