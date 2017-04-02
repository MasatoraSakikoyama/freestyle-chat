/* globals window, Vue, axios */
import AppRouter from './router/router';
import CSRFConfig from './config/csrf.config';

import template from './app.html';
import {} from './app.css';

import AppHeader from './components/header/header';
import AppContents from './components/contents/contents';
import AppFooter from './components/footer/footer';

Vue.use(AppRouter);
const router = new AppRouter();
window.application = new Vue({
  el: '#app',
  router,
  template,
  data: {
    router,
    isLogin: false,
  },
  components: {
    'app-header': AppHeader,
    'app-contents': AppContents,
    'app-footer': AppFooter,
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
