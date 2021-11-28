import { createStore } from 'vuex'
import {getPlatforms} from '@ionic/vue';
import toast from "./modules/toast";
import api from "./modules/api";
import user from "./modules/user";
import task from "./modules/task";
import {authStore} from "zelony-vue3-ionic-firebase-auth"
// import { Storage } from '@ionic/storage';
const store = createStore({
    devtools:true,
    state: {
        loaded:false,
        loading:{ show: true, text: "Loading" },
    },
    mutations: {
        set(state, [variable, value]) {
            state[variable] = value;
        }
    },
    getters:{
        isWeb(){
            // console.log(getPlatforms());
            return   getPlatforms().includes("mobileweb") || getPlatforms().includes("desktop");
            // return false
        }
    },
    modules: {
        toast,
        api,
        user,
        auth:authStore,
        task
    }
})
export default store;
