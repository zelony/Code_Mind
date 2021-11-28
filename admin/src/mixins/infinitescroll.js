import object from "@/mixins/object";

export default {
    mixins:[object],
    data:()=>({
        latest:null,
        finished:false,
        loading:false
    }),
    methods:{
        async fetchInfiniteApi(e,n,options=null){
            let api = this.apiName,
                index = 0;
            if (n) {
                this.latest = null;
                this[this.infiniteScroll.key] = [];
                this.finished = false;
            }
            options = options || this.options;
            index = this.latest ? this.latest.id : 0;
            this.loading = true;
            const data = await this.$store.dispatch("api/callApi", {
                name: api,
                options: {
                    index,
                    limit: this.infiniteScroll.limit,
                    ...options
                }
            });
            this.loading = false;
            if (e) {
                e.target.complete();
            }
            this.started = false;
            if (!data || data.length === 0) {
                this.finished = true;
                return;
            }
            this[this.infiniteScroll.key].push(...data);
            this.latest = data[data.length - 1];
        }

    },
    watch:{
        options:{
            immediate:true,
            handler(v,x){
                if (!this.objectEqual(v,x) || !this[this.infiniteScroll.key] || this[this.infiniteScroll.key].length === 0){
                    this.fetchInfiniteApi(null,true,v || null)
                }
            }
        }
    }
}
