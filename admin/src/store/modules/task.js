export default {
    namespaced:true,
    state:{
        filters:{
            type:0,
            team:null,
            user:null,
            project:null
        }
    },
    mutations:{
        changeFilter(state,[key,val]){
            state.filters[key] = val;
        }
    }
}