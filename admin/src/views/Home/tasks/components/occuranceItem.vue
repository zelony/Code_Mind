<template>
  <ion-grid>
    <ion-col size="6">
      <ion-item>
        <ion-label>Select Occurrence</ion-label>
        <ion-select placeholder="Occurrence" @ionChange="changeOcc" :value="modelValue.type">
          <ion-select-option v-for="type in types" :key="type.value" :value="type.value">{{ type.text }}</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-col>
    <ion-col size="6">
      <ion-item>
        <ion-label>At</ion-label>
        <ion-datetime v-if="modelValue.type === 0 || modelValue.type === 1" display-format="MM DD YYYY"  @ionChange="changeDate" :value="modelValue.at" placeholder="Select Date"/>
        <ion-select v-else-if="modelValue.type === 2" placeholder="Select Day" @ionChange="changeDate" :value="modelValue.at">
          <ion-select-option v-for="day in days" :key="day.code" :value="day.code">{{ day.day }}</ion-select-option>
        </ion-select>
        <ion-input v-else-if="modelValue.type === 3" :value="modelValue.at" @ionInput="changeDate" type="number" min="0" max="30"/>
        <ion-input v-else-if="modelValue.type === 4" :value="modelValue.at" @ionInput="changeDate" type="number" min="0" max="365"/>
      </ion-item>
    </ion-col>
    <ion-col col="12" v-if="![0,1].includes(modelValue.type)">
      <ion-item>
        <ion-label>Start</ion-label>
        <ion-datetime display-format="MM DD YYYY"  @ionChange="changeStart" :value="modelValue.start" placeholder="Select Start"/>
      </ion-item>
    </ion-col>
    <ion-col col="12" v-if="modelValue.type !== 1">
      <ion-item>
        <ion-label>Deadline</ion-label>
        <ion-datetime v-if="modelValue.type === 0" display-format="MM DD YYYY"  @ionChange="changeDead" :value="modelValue.deadline" placeholder="Select Deadline"/>
        <ion-input v-else-if="modelValue.type === 2" :value="modelValue.deadline" @ionInput="changeDead" type="number" min="0" max="7" placeholder="Count Days"/>
        <ion-input v-else-if="modelValue.type === 3" :value="modelValue.deadline" @ionInput="changeDead" type="number" min="0" max="28" placeholder="Count Days"/>
        <ion-input v-else-if="modelValue.type === 4" :value="modelValue.deadline" @ionInput="changeDead" type="number" min="0" max="365" placeholder="Count Days"/>
      </ion-item>
    </ion-col>

    <ion-col col="12" v-if="modelValue.type !== 0">
      <ion-item>
        <ion-label>Finish At</ion-label>
        <ion-datetime  display-format="MM DD YYYY"  @ionChange="changeFinish" :value="modelValue.finish" placeholder="Select Finish"/>
      </ion-item>
    </ion-col>
  </ion-grid>

</template>

<script>
import {IonGrid,IonInput,IonItem,IonCol,IonLabel,IonSelect,IonSelectOption,IonDatetime} from "@ionic/vue";
export default {
  components:{IonGrid,IonItem,IonCol,IonLabel,IonSelect,IonSelectOption,IonDatetime,IonInput},
  name: "occuranceItem",
  props:{
    modelValue:{}
  },
  methods:{
    changeOcc(ev){
      const v = this.modelValue;
      v.type = ev.target.value
      this.$emit('update:modelValue',v)
    },
    changeDate(ev){
      const v = this.modelValue;
      v.at = ev.target.value
      this.$emit('update:modelValue',v)
    },
    changeDead(ev){
      const v = this.modelValue;
      v.deadline = ev.target.value
      this.$emit('update:modelValue',v)
    },
    changeFinish(ev){
      const v = this.modelValue;
      v.finish = ev.target.value
      this.$emit('update:modelValue',v)
    },
    changeStart(ev){
      const v = this.modelValue;
      v.start = ev.target.value
      this.$emit('update:modelValue',v)
    }
  },
  setup(){
    return{
      days : [
          { day: "Sunday", code: 6 },
          { day: "Monday", code: 0 },
          { day: "Tuesday", code: 1 },
          { day: "Wednesday", code: 2 },
          { day: "Thursday", code: 3 },
          { day: "Friday", code: 4 },
          { day: "Saturday", code: 5 }
      ],
      types:[
        {
          text:"once",
          value:0
        },
        {
          text:"daily",
          value:1
        },
        {
          text:"weekly",
          value:2
        },
        {
          text:"monthly",
          value:3
        },
        // {
        //   text:"yearly",
        //   value:4
        // },
      ]
    }
  }
}
</script>

<style scoped>

</style>