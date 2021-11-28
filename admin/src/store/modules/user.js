export default {
    namespaced:true,
    state:{
      profile:{}
    },
    mutations: {
        profile(state, val) {
            state.profile = {...state.profile,...val};
        },
    },
    actions:{
        async get({ dispatch, commit }) {
            const result =
                (await dispatch(
                    "api/callApi",
                    { name: "student-profile" },
                    { root: true }
                )) || {};
            await commit("profile", result);
        },
        async update({ dispatch }, fields = {}) {
            const ret = await dispatch(
                "api/callApi",
                {
                    name: "student-update",
                    options: fields
                },
                { root: true }
            );
            await dispatch("get");
            return ret;
        }
    }
}