import { url } from './config.js';
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const app = {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      axios.post(`${url}v2/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
          window.location = 'products.html';
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    }
  }
}
createApp(app).mount('#app');