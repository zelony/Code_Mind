import TimeAgo from 'javascript-time-ago'
import ar from 'javascript-time-ago/locale/ar';
TimeAgo.addDefaultLocale(ar);
export default{
  methods:{
    timeFromTimeStamp(t){
      if (t){
        const timeAgo = new TimeAgo('ar')
        return  timeAgo.format(this.timestampToDate(t));
      }
    },
    timestampToDate(timestamp){
      if (timestamp){
        return new this.$firebase.firebase_.firestore.Timestamp(timestamp.seconds,timestamp.nanoseconds).toDate();
      }
    },
    time(t){
      if (t){
        const timeAgo = new TimeAgo('ar')
        return timeAgo.format(t || new Date())
      }
    },
    getColorOfStatus(state) {
      switch (state) {
        case "pending" || "not-started":
          return "secondary";
        case "accepted" || "started":
          return "success";
        case "refused" || "too-late":
          return "danger";
        case "finished":
          return "danger";
      }
    }

  }
}
