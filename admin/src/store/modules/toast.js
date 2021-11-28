import "sweetalert2/src/sweetalert2.scss";
const Swal = require("sweetalert2");
export default {
  namespaced: true,
  mutations: {
    success(stat, text) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: text
      });
    },
    info(stat, { title, message }) {
      Swal.fire(title, message, "info");
    },
    comingSoon() {
      Swal.fire({
        title: "Coming soon",
        text: "This Feature will be available soon",
        icon: "info"
      });
    },
    error(stat, error) {
      console.trace(error);
      Swal.fire({
        icon: "error",
        title: "Error:" + error.code,
        text: error.message
      });
    }
  }
};
