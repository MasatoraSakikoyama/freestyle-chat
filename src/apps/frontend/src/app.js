/* globals window, Vue, Vuex, axios */
import AppRouter from './router/router';
import AppStore from './store/store';
import CSRFConfig from './config/csrf.config';
import template from './app.html';
import {} from './app.css';
import AppComponents from './components/components';
import { SESSION, LOGIN_CHECK } from './store/modules/session/types';

const router = new AppRouter();
const store = new AppStore();
window.application = new Vue({
  el: '#app',
  router,
  store,
  template,
  components: {
    'app-components': AppComponents,
  },
  methods: {
    ...Vuex.mapActions(SESSION, {
      loginCheck: LOGIN_CHECK,
    }),
  },
  created() {
    axios.interceptors.request.use(CSRFConfig);
    this.loginCheck();
  },
});
