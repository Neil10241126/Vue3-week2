import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
import { url, api_path } from './config.js';

const app = {
  data() {
    return {
      products: [],
    }
  },
  methods: {
    checkAdmin(){
      axios.post(`${url}v2/api/user/check`)
        .then(() => {
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        })
    },
    getProducts() {
      axios.get(`${url}v2/api/${api_path}/admin/products`)
        .then((res) => {
          console.log(res.data);
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    }
  },
  mounted(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;

    this.checkAdmin();
  }
}
createApp(app).mount('#app');

// function getProducts() {
//   axios.get(`${url}v2/api/${api_path}/admin/products`)
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => {
//       alert(err.response.data.message);
//     })
// }

// getProducts();
