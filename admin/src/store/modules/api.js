import {functions} from "@/services/firebase";
export default {
  namespaced: true,
  actions: {
    async callApi({ commit }, { name, options = undefined }) {
      try {
        const { data } = await functions.httpsCallable(name)(options);
        const isJson = str => {
          try {
            JSON.parse(str);
          } catch (e) {
            return false;
          }
          return true;
        };
        console.log(data);
        if (data) {
          if (data.error) {

            throw data;
          }
          if (isJson(data)) {
            return JSON.parse(data);
          } else {
            return data;
          }
        }
        console.log(data);
        throw new Error(data);
      } catch (e) {
        console.log(e);
        commit("toast/error", e, { root: true });
        return null;
      }
    }
  }
};
