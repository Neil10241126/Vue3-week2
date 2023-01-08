// import 匯出檔案
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
import { url } from './config.js';

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
    //  建立 登入方法 login()
    login() {
      axios.post(`${url}v2/admin/signin`, this.user)
        .then((res) => {
          // 存放token、有效時間expired
          const { token, expired } = res.data;

          // 寫入 cookie token
          // expires 設置有效時間
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