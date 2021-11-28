import {loadingController} from "@ionic/vue";
export default {
    data:()=>({
        l:null,
        loading:false
    }),
    methods:{
        async presentLoading({message="Please Wait loading",duration=0} = {}) {
            this.loading = true;
            const loading = await loadingController
                .create({
                    cssClass: 'my-custom-class',
                    message,
                    duration,
                });

            await loading.present();
            this.l = loading;
        },
        async dismissLoading(){
            await this.l.dismiss();
            this.l = null;
            this.loading = false;
        }
    }

}