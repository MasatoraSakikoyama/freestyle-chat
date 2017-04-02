/* globals window, Vue, axios */
import router from './router/router';
import CSRFConfig from './config/csrf.config';

import template from './app.html';
import {} from './app.css';

import appHeader from './components/header/header';
import appContents from './components/contents/contents';
import appFooter from './components/footer/footer';

window.application = new Vue({
  el: '#app',
  router,
  template,
  data: {
    router,
    isLogin: false,
  },
  components: {
    'app-header': appHeader,
    'app-contents': appContents,
    'app-footer': appFooter,
  },
  methods: {
    login() {
      this.isLogin = true;
    },
    logout() {
      this.isLogin = false;
    },
  },
  created() {
    axios.interceptors.request.use(CSRFConfig);
    axios.get('/api/session/login')
      .then((response) => {
        this.isLogin = response.data.isLogin;
      })
      .catch(() => {
        throw new Error('Fail get Login info');
      });
  },
});
