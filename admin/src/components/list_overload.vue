<template>
  <ion-refresher slot="fixed" @ionRefresh="fetchInfiniteApi($event,true)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
  <template v-if="elements.length > 0">
    <ion-grid>
      <ion-row>
        <ion-col size="12" size-md="6" size-lg="4" size-xl="3" v-for="(el) in filteredAndSorted" :key="el.id" >
          <slot name="element" :el="el"/>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-infinite-scroll
        @ionInfinite="fetchInfiniteApi($event,false)"
        threshold="100px"
        id="infinite-scroll"
        :disabled="finished"
    >
      <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading more data...">
      </ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </template>

</template>

<script>
import {
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
  IonRow
} from "@ionic/vue";
import infinitescroll from "@/mixins/infinitescroll";

export default {
  name: "list_overload",
  mixins:[infinitescroll],
  components:{
    IonGrid,IonRefresher,IonRefresherContent,IonInfiniteScrollContent,IonInfiniteScroll,IonRow,IonCol,
  },
  data:()=>({
    elements:[]
  }),
  computed:{
    infiniteScroll(){
      return{
        limit:this.limit,
        key:'elements',
      }
    },
    filteredAndSorted(){
      let elements = this.elements;
      if (this.filterFunction){
        elements = this.filterFunction(elements);
      }
      if (this.sortFunction){
        elements = elements.sort(this.sortFunction);
      }
      return elements;
    }
  },
  props:{
    apiName:{
      type:String,
      required:true
    },
    limit:{
      type:[Number,String],
      default:20
    },
    options:{},
    sortFunction:Function,
    filterFunction:Function
  }
}
</script>

<style scoped>

</style>